import { API_URL } from "../../consts";
import { currentUser } from "./user.svelte";
import type { VouchListItem } from "backend/app";
import type { VouchUploadRequest } from "backend/src/upload";

type MediaType = "image" | "audio" | "video";
const controller = new AbortController();

interface MessageType {
	message: string;
	type: "warning" | "error" | "success";
}

class ActiveVouch {
	img: HTMLImageElement | null = $state(null);
	vouchData = $state<VouchListItem[]>([]);
	isUploading = $state(false);
	notification = $state<Array<MessageType>>([]);
	hash = $derived<string>(this.img?.dataset?.vouchArtHash || "");

	clear() {
		this.img = null;
		this.vouchData = [];
		this.notification = [];
		this.isUploading = false;
		controller.abort();
	}

	async populateVouchData() {
		const url = new URL(API_URL);
		url.pathname = `/vouch-list/${this.hash}`;

		const res = await fetch(url, {
			signal: controller.signal,
		});

		if (!res.ok) {
			this.notification.push({
				message: "Failed to fetch vouch data from the server",
				type: "warning",
			});
			return;
		}
		const data: VouchListItem[] = await res.json();
		this.vouchData = data;
	}

	async vouch(message?: string) {
		if (!currentUser?.data) throw new Error("login first");
		const reqId = this.img.dataset.vouchArtId;
		if (!reqId) throw new Error("img element is not a valid vouch element");

		const url = new URL(API_URL);
		url.pathname = "/vouch";

		const body = {
			reqId,
			message,
			imgHash: this.hash,
			userCredential: currentUser.data,
			imgUrl: this.img.src,
		} satisfies VouchUploadRequest;

		this.isUploading = true;
		try {
			const res = await fetch(url, {
				signal: controller.signal,
				method: "POST",
				body: JSON.stringify(body),
			});

			if (!res.ok) return;
			const data: VouchListItem = await res.json();
			if (data.is_duplicate) {
				this.notification.push({
					message: message
						? "You have already vouch this image with the same message."
						: "You have already vouch this image.",
					type: "warning",
				});
			} else {
				this.vouchData.push(data);
			}
		} catch (error) {
		} finally {
			this.isUploading = false;
		}
	}
}

export const active = new ActiveVouch();
