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
		console.log(res);
		return { ok: { intermediate: res[1], result: toBase32(res[0], res[2]) } } as State;
	});
</script>

<div class="container">
	<h2>Item Sequence</h2>
	<input bind:value={input_val} />
	{#if val.err}
		<p>{val.err}</p>
	{/if}

	{#if val.ok}
		<p class="code">
			{val.ok.intermediate}
		</p>
		<p class="code output">{val.ok.result}</p>
	{/if}
</div>
