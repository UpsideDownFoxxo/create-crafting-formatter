<script lang="ts">
	import { base } from '$app/paths';
	import ItemSequence from '$lib/item_sequence.svelte';
	import SlotConfig from '$lib/slot_config.svelte';
	import { writable } from 'svelte/store';
	import { fromBase8, toBase32 } from '$lib/converter';
	import CopyButton from '$lib/copy_button.svelte';

	let checks = writable(Array(21).fill(false) as boolean[]);

	let check_str = $derived.by(() => {
		const num = $checks.reduce((a, e, i) => a | ((e ? 1 : 0) << i), 0);
		let str = num.toString(16).toUpperCase();
		return '0'.repeat(6 - str.length) + str;
	});

	let checkedNum = $derived.by(() => {
		let n = 0;
		$checks.forEach((e) => (e ? n++ : n));
		return n;
	});

	type State = {
		err?: string;
		ok?: {
			intermediate: string;
			result: string;
		};
	};

	let input_val = $state('');

	let val = $derived.by(() => {
		const result = fromBase8(input_val, checkedNum);
		if (result.getErr()) {
			return { err: result.getErr()?.message as string } as State;
		}
		const res = result.unwrap();
		return { ok: { intermediate: res[1], result: toBase32(res[0], res[2]) } } as State;
	});

	$effect(() => {
		console.log(input_val);
	});

	let text = $derived.by(() => {
		if (val.ok) {
			return val.ok.result + '|' + check_str;
		}

		return 'Invalid config';
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
		rel="stylesheet"
	/>

	<link rel="stylesheet" href="{base}/global.css" />
</svelte:head>

<div class="main">
	<ItemSequence bind:input_val {val}></ItemSequence>
	<SlotConfig {checks} {check_str}></SlotConfig>
	<CopyButton {text} valid={!val.err}></CopyButton>
</div>

<style>
	.main {
		display: table;
	}
</style>
