<svelte:options
	customElement={{
		tag: "vouch-art-anchor",
	}}
/>

<script lang="ts">
	import { active } from "$lib/stores/vouch.svelte";
	import { onDestroy, onMount, type Snippet } from "svelte";
	import { isElementHidden } from "$lib/utils/dom";
	import { Paperclip } from "lucide-svelte";

	interface Props {
		hash: string;
		src: string;
		imgEl: HTMLImageElement;
		children?: Snippet;
	}

	const { hash, src, imgEl }: Props = $props();
	let isHidden = $state(true);

	function observeFn() {
		// isHidden = isElementHidden(imgEl);
		const timer = setInterval(() => {
			// isHidden = isElementHidden(imgEl);

			if (!imgEl.isConnected) {
				clearInterval(timer);
				$host().remove();
			}
		}, 100);
	}

	function imgSetup() {
		imgEl.addEventListener("mouseenter", onImgMouseEnter);
		imgEl.addEventListener("mouseleave", onImgMouseLeave);
	}

	function onImgMouseEnter(e: Event) {
		isHidden = false;
	}

	function onImgMouseLeave(e: Event) {
		isHidden = true;
	}

	function onClick() {
		active.img = imgEl;
	}

	onMount(() => {
		observeFn();
		imgSetup();
	});

	onDestroy(() => {
		imgEl.removeEventListener("mouseenter", onImgMouseEnter);
		imgEl.removeEventListener("mouseleave", onImgMouseLeave);
	});
</script>

<button
	part="button"
	onclick={onClick}
	class="vouch-art__container"
	class:isHidden
>
	<div class="vouch-art__body">
		<Paperclip size={24} /> Vouch
	</div>
</button>

<style lang="postcss">
	.isHidden {
		display: none;
	}

	.vouch-art__container {
		font-family: vollkorn, serif;
		border-radius: 8px;
		background: hsl(190 10% 100%);
		padding: 4px 16px 4px 8px;
		cursor: pointer;
		border: 2px solid hsl(190 10% 50%);
		/* display: flex; */
		align-items: center;
		justify-content: center;
		color: hsl(190 14% 24%);
		font-weight: 600;

		&:hover {
			background: hsl(190 10% 96%);
			border-color: hsl(190 10% 30%);
		}

		&:hover,
		&:focus,
		&:active {
			display: flex;
		}

		.vouch-art__body {
			display: flex;
			gap: 8px;
			align-items: center;
		}
	}
</style>
