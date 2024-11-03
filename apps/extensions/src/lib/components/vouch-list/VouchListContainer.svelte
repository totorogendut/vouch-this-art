<script lang="ts">
	import { active } from "$lib/stores/vouch.svelte";
	import VouchListItem from "$lib/components/vouch-list/VouchListItem.svelte";
	import ActiveAnchorNotification from "./ActiveAnchorNotification.svelte";

	const vouchWithMessage = $derived(
		active.vouchData?.filter?.((data) => !!data.keyvalues?.message) ||
			[],
	);

	const vouchNoMessage = $derived(
		active.vouchData?.filter?.((data) => !data.keyvalues?.message) ||
			[],
	);

	const vouchText = $derived.by(() => {
		if (active.vouchData?.length > 99) return "Vouched 99+ times";
		if (active.vouchData?.length)
			return `Vouched ${active.vouchData.length} times`;
		return "This image hasn't yet been vouched";
	});
</script>

{#if active.vouchData?.length}
	<strong>{vouchText}</strong>
	<div class="content">
		{#each vouchWithMessage as data}
			<VouchListItem {data} />
		{/each}

		{#each vouchNoMessage as data}
			<VouchListItem {data} />
		{/each}
	</div>
	<ActiveAnchorNotification />
{/if}

<style lang="scss">
	strong {
		margin-top: 16px;
		margin-bottom: 8px;
		font-weight: 900;
		display: block;
		color: #fffe;
		font-family: vollkorn, serif;
	}
	.content {
		display: flex;
		gap: 12px;
		// font-family: Verdana, Geneva, Tahoma, sans-serif;
		font-size: 14px;
		align-items: start;
		flex-wrap: wrap;
	}
</style>
