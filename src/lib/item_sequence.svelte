<script lang="ts">
	import { fromBase8, toBase32 } from './converter';

	type State = {
		err?: string;
		ok?: {
			intermediate: string;
			result: string;
		};
	};

	let { limit } = $props();

	let input_val = $state('');
	let val = $derived.by(() => {
		const result = fromBase8(input_val, limit);
		if (result.getErr()) {
			return { err: result.getErr()?.message as string } as State;
		}
		const res = result.unwrap();
		return { ok: { intermediate: res[1], result: toBase32(res[0], res[2]) } } as State;
	});
</script>

<div class="container">
	<h2 class="header">Item Sequence</h2>
	<input bind:value={input_val} />
	{#if val.err}
		<p class="code output">{val.err}</p>
	{/if}

	{#if val.ok}
		{#each val.ok.intermediate
			.match(/(.{1,20})/g)
			?.reverse() as ArrayLike<string> as item, index (index)}
			<p class="code">
				{item}
			</p>
		{/each}

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
