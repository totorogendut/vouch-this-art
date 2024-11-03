import { nanoid } from "nanoid";
import "./lib/components/active-modal/ActiveAnchorDialog.svelte";
import "./lib/components/ImageAnchorContainer.svelte";
import { wrap, type Remote } from "comlink";
import type { imagesWorker } from "$lib/utils/images.worker";
import Worker from "$lib/utils/images.worker?worker&inline";
import { imgToUint8Array, waitForImageLoad } from "$lib/utils/images";
import PQueue from "p-queue";

const viableImages = [];

const dialogEl = document.createElement("vouch-art-active-form");
//@ts-ignore
document.body.append(dialogEl);

const workers = Array<Remote<typeof imagesWorker>>(
	navigator.hardwareConcurrency,
).fill(wrap<typeof imagesWorker>(new Worker()));

const queues = Array<PQueue>(navigator.hardwareConcurrency).fill(
	new PQueue({ concurrency: 1 }),
);

let qIndex = 0;
console.log(`Spawning ${workers?.length} workers for Vouch This Art`);

async function setup() {
	if (qIndex >= workers.length) qIndex = 0;
	const images = document.querySelectorAll("img:not([data-vouch-art-id])");
	// console.log(images);

	for (const img of images) {
		if (!(img instanceof HTMLImageElement)) continue;
		try {
			const id = nanoid();
			img.dataset.vouchArtId = id;

			setupImage(img, id);
		} catch (error) {
			img.dataset.vouchArtId = "error";
		}
	}

	qIndex++;
	setTimeout(() => {
		setup();
	}, 1000);
}

async function setupImage(img: HTMLImageElement, id: string) {
	await waitForImageLoad(img);
	if (img.width * img.height < 200 * 200) {
		img.dataset.vouchArtId = "null";
		return;
	}

	const anchorName = `--anchor-${id}`;
	//@ts-ignore
	img.style.anchorName = anchorName;

	if (img.style.viewTransitionName && img.style.viewTransitionName !== "none")
		img.dataset.originalViewTransition = img.style.viewTransitionName;

	// queue md5 hash generation at the rate of 1 image hash per hardware thread
	queues[qIndex].add(async () =>
		workers[qIndex]
			.getMD5HashFromImage(await imgToUint8Array(img))
			.then((hash) => {
				img.dataset.vouchArtHash = hash;

				const anchorEl = document.createElement("vouch-art-anchor");
				anchorEl.style.setProperty("--position-anchor-name", anchorName);
				//@ts-ignore
				anchorEl.hash = hash;
				//@ts-ignore
				anchorEl.src = img.src;
				//@ts-ignore
				anchorEl.imgEl = img;

				document.body.append(anchorEl);

				viableImages.push(hash);
			})
			.catch((err) => {
				console.error(err);
				img.dataset.vouchArtId = "error";
			}),
	);
}

setup();
// setInterval(() => {
// 	setup();
// }, 1000);
