<script lang="ts">
	import { active } from "$lib/stores/vouch.svelte";
	import { Paperclip } from "lucide-svelte";

	let message = $state("");
	const disabled = $derived(active.isUploading);

	async function vouchThisArt(e: Event) {
		if (disabled) return;
		active.vouch(message);
		message = "";
	}
</script>

<div class="cta">
	<textarea
		bind:value={message}
		placeholder="(Optional) your message"
		name="message"
		{disabled}
	></textarea>
	<button {disabled} type="submit" onclick={vouchThisArt}>
		{#if active.isUploading}
			Please wait...
		{:else}
			<Paperclip />
			<span>Vouch!</span>
		{/if}
	</button>
</div>

<style lang="scss">
	.cta {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 8px;

		textarea {
			padding: 8px;
			border-radius: 8px;
			flex-grow: 1;
			border: 2px solid hsl(33 40% 55%);
			min-height: 80px;
		}

		button {
			all: unset;
			flex-shrink: 0;
			border-radius: 8px;
			color: #fffd;
			background-color: hsl(33 40% 55%);
			border: 2px solid hsl(33 40% 55%);
			display: flex;
			// flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 12px;
			padding: 8px;
			justify-self: start;
			cursor: pointer;
			height: 48px;
			box-sizing: border-box;

			&:disabled {
				filter: grayscale(20%);
				cursor: auto;
			}

			&:not(:disabled) {
				&:hover {
					filter: brightness(95%);
				}

				&:active {
					filter: brightness(110%);
				}
			}
		}
	}
</style>
