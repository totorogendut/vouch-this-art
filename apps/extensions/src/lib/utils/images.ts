export async function imageToBlob(imgEl: HTMLImageElement): Promise<Blob> {
	return new Promise((resolve, reject) => {
		const canvas = document.createElement("canvas");
		canvas.width = imgEl.width;
		canvas.height = imgEl.height;

		const ctx = canvas.getContext("2d");
		ctx.drawImage(imgEl, 0, 0);

		canvas.toBlob((blob) => {
			resolve(blob);
		}, "image/*");
	});
}

export async function imgToUint8Array(imgEl: HTMLImageElement) {
	try {
		return getImageDataFromCanvas(imgEl);
	} catch (error) {
		const res = await fetch(imgEl.src);
		if (!res.ok) throw new Error(`Failed to fetch image: ${res.statusText}`);
		const blob = await res.blob();
		return new Uint8Array(await blob.arrayBuffer());
	}
}

export function getImageDataFromCanvas(imgEl: HTMLImageElement) {
	const canvas = new OffscreenCanvas(imgEl.width, imgEl.height);
	const ctx = canvas.getContext("2d");
	// const imgLocal = new Image();
	// imgLocal.src = imgEl.src;
	// imgLocal.crossOrigin = imgEl.crossOrigin || "anonymous";
	ctx.drawImage(imgEl, 0, 0);
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	return new Uint8Array(imageData.data.buffer);
}

export function waitForImageLoad(
	img: HTMLImageElement,
): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		if (img.complete && img.naturalHeight !== 0) {
			resolve(img);
		} else if (img.complete && img.naturalHeight === 0) {
			reject(new Error("Image failed to load"));
		} else {
			img.addEventListener("load", () => resolve(img), { once: true });
			img.addEventListener(
				"error",
				() => reject(new Error("Image failed to load")),
				{ once: true },
			);
		}
	});
}
