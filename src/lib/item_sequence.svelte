<script lang="ts">
	let { input_val = $bindable(), val } = $props();
</script>

<div class="container">
	<h2 class="header">Item Sequence</h2>
	<input bind:value={input_val} />
	{#if val.err}
		<p class="code output">{val.err}</p>
	{/if}

	{#if val.ok}
		<p class="code output">{val.ok.result}</p>
	{/if}
</div>

<style>
	input {
		margin-top: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
		padding: 0 1rem;
		width: 21ch;

		font-size: 2rem;
		font-family: 'Inter', ui-sans-serif;
		font-weight: 500;
		letter-spacing: 4px;

		background-color: var(--secondary20);
		border: none;
		border-radius: 1rem;
		color: var(--text);
		align-self: center;
	}

	.container {
		display: flex;
		flex-direction: column;
	}
</style>
