<script lang="ts">
	import { active } from "$lib/stores/vouch.svelte";
</script>

<div class="notifications">
	{#each active.notification as { message, type }}
		<div class={type}>
			{(() => {
				if (type === "warning") return "⚠️";
				if (type === "error") return "🚨";
				if (type === "success") return "✅";
			})()}
			{message}
		</div>
	{/each}
</div>

<style lang="scss">
	.notifications {
		display: flex;
		flex-direction: column-reverse;
		gap: 4px;
		margin-top: 24px;
		// font-weight: 700;

		:global {
			.warning {
				color: rgb(255, 200, 98);
			}

			.success {
				color: rgb(98, 255, 127);
			}

			.error {
				color: rgb(238, 138, 122);
			}
		}
	}
</style>
