<script lang="ts">
	import { fromBase8, toBase32 } from './converter';

	type State = {
		err?: string;
		ok?: {
			intermediate: string;
			result: string;
		};
	};

	let val = $state({ err: '' } as State);
	let timer: number;

	const debounce = (v: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			const result = fromBase8(v);

			if (result.getErr()) {
				val = { err: result.getErr()?.message as string };
				return;
			}
			const res = result.unwrap();
			console.log(res);
			val = { ok: { intermediate: res[1], result: toBase32(res[0], res[2]) } };
		}, 100);
	};
</script>

<div class="container">
	<h2>Item Sequence</h2>
	<input
		onkeyup={({ target }) => {
			debounce((target as HTMLInputElement).value);
		}}
	/>
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
