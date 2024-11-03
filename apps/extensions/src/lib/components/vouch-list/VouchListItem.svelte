<script lang="ts">
	import { active } from "$lib/stores/vouch.svelte";
	import { sha256 } from "js-sha256";
	import { minidenticon } from "minidenticons";
	import { API_URL } from "../../../consts";

	interface Props {
		data: (typeof active.vouchData)[number];
	}

	const { data }: Props = $props();
	const cid = $derived(data.cid);

	const avatar = $derived.by(() => {
		if (data.keyvalues?.email)
			return `https://gravatar.com/avatar/${sha256(data.keyvalues.email)}`;

		return minidenticon(data.keyvalues.id);
	});

	const { message, username } = $derived(data.keyvalues);

	async function verify() {
		if (!cid) return;
		const url = new URL(API_URL);
		url.pathname = `/verify-vouch/${cid}`;

		try {
			const res = await fetch(url);
			if (!res.ok) {
				active.notification.push({
					message: "Verification failed",
					type: "warning",
				});
				return;
			}
			active.notification.push({
				message: "Verification success",
				type: "success",
			});
		} catch (error) {
			active.notification.push({
				message: "Verification error",
				type: "error",
			});
		}
	}
</script>

<div class="vouch-list__item">
	<div class:hasMessage={!!message}>
		<img
			style="grid-area: avatar; --username:{username};"
			src={avatar}
			alt={username}
		/>
		{#if message}
			<strong style="grid-area: username;">{username}</strong>
			<span style="grid-area: message;">{message}</span>
		{:else}
			<span class="tooltip">{username}</span>
		{/if}
	</div>
	<button class="verify" onclick={verify}>Verify</button>
</div>

<style lang="scss">
	.vouch-list__item {
		position: relative;
		color: #000e;

		strong {
			font-variation-settings: "wght" 700;
		}

		.hasMessage {
			padding: 4px 12px 4px 6px;
			max-width: 200px;
			border-radius: 4px;
			background: #fff;
			display: grid;
			gap: 0 8px;
			grid-template-columns: 48px 1fr;
			grid-template-rows: 20px 1fr;
			grid-template-areas: "avatar username" "avatar message";
			overflow: hidden;
			// box-shadow:
			// 	4px 4px 8px 12px #0001,
			// 	4px 4px 4px 6px #0002;
			// border: 2px solid #0006;
		}

		.tooltip {
			position: absolute;
			top: -16px;
			left: 50%;
			padding: 2px 4px;
			background: #fff;
			border-radius: 4px;
			border: 1px solid #0006;
			transition: all 0.22s ease-in-out;
			transform: translateX(-50%) translateY(-2px);
			opacity: 0;
		}

		.verify {
			all: unset;
			font-variation-settings: "wght" 700;
			margin-top: 4px;
			color: lch(82% 15% 280);
			cursor: pointer;
			text-decoration: underline;

			&:hover {
				color: lch(87% 12% 280);
			}
		}

		&:not(:has(.hasMessage)) {
			.verify {
				text-align: center;
				width: 100%;
			}
		}

		&:hover {
			.tooltip {
				transform: translateX(-50%);
				opacity: 1;
			}
		}

		img {
			border-radius: 50%;
			width: 48px;
			height: 48px;
			outline: 2px solid white;
		}
	}
</style>
