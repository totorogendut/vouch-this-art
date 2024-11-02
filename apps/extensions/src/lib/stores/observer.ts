// import { isElementHidden } from "$lib/utils/dom";
// import { SvelteMap } from "svelte/reactivity";

// class ImageAnchorObserver {
// 	hiddenElements = new SvelteMap<string, boolean>();
// 	observer = new MutationObserver((entries) => {
// 		for (const mutation of entries) {
// 			if (
// 				mutation.attributeName === "style" ||
// 				mutation.attributeName === "class"
// 			) {
// 				const element = mutation.target;
// 				const hash = (element as HTMLElement).dataset.vouchArtHash;
// 				this.hiddenElements.set(hash, isElementHidden(element as HTMLElement));
// 			}
// 		}
// 	});
// }

// export const observer = new ImageAnchorObserver();
