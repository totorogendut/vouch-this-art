<script lang="ts">
	import { active } from "$lib/stores/vouch.svelte";

	const isLandscape = $derived(
		(active.img?.naturalWidth || 0) >
			(active.img?.naturalHeight || 0),
	);
</script>

<div class="image-wrapper">
	<img
		class:isLandscape
		width={active.img.naturalWidth}
		height={active.img.naturalHeight}
		src={active.img.src}
		alt={active.img.alt}
	/>
</div>

<style lang="scss">
	.image-wrapper {
		container: vouch-art__image-wrapper;
		min-height: 200px;

		width: 60%;
		flex-grow: 1;
		align-self: self-start;
		position: relative;
		isolation: isolate;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			display: block;
			border-radius: 8px;
			width: auto;
			height: 80vh;
			z-index: 2;
			position: relative;

			&.isLandscape {
				width: 100% !important;
				height: auto !important;
			}
		}

		// &::before {
		// 	content: "";
		// 	width: 220%;
		// 	height: 300%;
		// 	top: -130%;
		// 	left: -80%;
		// 	position: absolute;
		// 	display: block;
		// 	z-index: -5;
		// 	// pointer-events: none;
		// 	background: rgb(201, 255, 235);
		// 	background: radial-gradient(
		// 		circle,
		// 		rgba(111, 167, 146, 0.6) 10%,
		// 		rgba(72, 118, 101, 0.2) 30%,
		// 		rgba(0, 0, 0, 0) 100%
		// 	);
		// }
	}
</style>
