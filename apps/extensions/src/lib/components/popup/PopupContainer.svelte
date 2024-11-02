<script lang="ts">
	import { currentUser } from "$lib/stores/user.svelte";
</script>

<section>
	{#if currentUser.isLoggedin}
		<div class="loggedin">
			<div class="user">
				<img
					width="64"
					height="64"
					src={currentUser.avatar}
					alt={currentUser.data.credentialSubject?.username}
				/>
				<strong>{currentUser.username}</strong>
			</div>
			<button onclick={currentUser.logout}>Logout</button>
		</div>
	{:else}
		<form onsubmit={currentUser.login}>
			<input type="text" />
			<input type="password" />
			<button type="submit">Login</button>
		</form>
	{/if}
</section>

<style lang="scss">
	section {
		padding: 12px;
		min-height: 400px;

		.loggedin {
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: space-between;

			img {
				border-radius: 50%;
			}
		}
		form {
			display: flex;
			width: 100%;
			flex-direction: column;
			gap: 4px;
		}
	}
</style>
