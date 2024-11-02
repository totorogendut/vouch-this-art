<svelte:options
	customElement={{
		tag: "vouch-art-active-form",
	}}
/>

<script lang="ts">
	import { active } from "$lib/stores/vouch.svelte";
	import { CircleX } from "lucide-svelte";
	import ActiveAnchorCta from "./ActiveAnchorCTA.svelte";
	import VouchListContainer from "$lib/components/vouch-list/VouchListContainer.svelte";
	import ActiveAnchorDialogImage from "./ActiveAnchorDialogImage.svelte";

	const hasData = $derived(active.vouchData.length);

	$effect(() => {
		if (active.hash && !hasData)
			active.populateVouchData().catch(console.error);
	});

	$effect(() => {
		if (active.img) {
			active.img.style.viewTransitionName =
				active.img.dataset.vouchArtId;

			document.startViewTransition(() => {
				active.img.classList.add("");
			});
		} else {
			// active.img.style.viewTransitionName =
			// 	active.img.dataset.originalViewTransition || "";
		}
	});

	function keyUp(e: KeyboardEvent) {
		if (e.key === "Escape") active.clear();
	}
</script>

<svelte:window on:keyup={keyUp} />

{#if active.img}
	<dialog onclose={() => active.clear()} open={true}>
		<div class="main-content">
			<ActiveAnchorDialogImage />
			<div class="vouch-list">
				<ActiveAnchorCta />
				<VouchListContainer />
			</div>
		</div>
		<form method="dialog">
			<button type="submit" class="close">
				<CircleX size={32} />
			</button>
		</form>
	</dialog>
{/if}

<style lang="postcss">
	dialog {
		position: fixed;

		/* top: 12%; */
		top: 0;
		left: 0;
		border: none;
		width: 100%;
		height: 100vh;
		background: #000a;
		backdrop-filter: blur(12px);

		isolation: isolate;
		/* overflow: hidden; */
		z-index: 9999999;
		font-family: manrope, Verdana, Geneva, Tahoma, sans-serif;

		.main-content {
			padding: 48px;
			padding-top: 4%;
			padding-top: min(72px, 4%);
			isolation: isolate;
			width: 100%;
			width: min(100%, 1800px);
			display: flex;
			gap: 16px;
			box-sizing: border-box;
			margin: 0 auto;
		}

		.vouch-list {
			flex-shrink: 0;
			flex-basis: 30%;
			position: relative;
			z-index: 2;
		}

		form {
			position: fixed;
			z-index: 5;
			top: 16px;
			right: 65px;

			.close {
				all: unset;
				cursor: pointer;
				opacity: 80%;

				&:hover {
					opacity: 100%;
				}

				:global {
					svg {
						fill: #fff8;
					}
				}
			}
		}
	}
</style>
