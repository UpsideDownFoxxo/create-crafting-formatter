<svelte:options />

<script lang="ts">
	import { writable } from 'svelte/store';

	const s = [0, 3, 18];
	let checks = writable(Array(21).fill(false) as boolean[]);

	$effect(() => {
		let n = 0;
		$checks.forEach((e) => (e ? n++ : n));
		checkedNumUpdate(n);
	});

	let { checkedNumUpdate } = $props();

	let str = $derived.by(() => {
		const num = $checks.reduce((a, e, i) => a | ((e ? 1 : 0) << i), 0);
		let str = num.toString(16).toUpperCase();
		return '0'.repeat(6 - str.length) + str;
	});

	function updateCheckbox(index: number) {
		$checks[index] = !$checks[index];
	}
</script>

<div class="container">
	<h2>Slot Config</h2>
	<div class="grid">
		{#each $checks as checked, index (index)}
			{#if s.includes(index)}
				<div></div>
			{/if}
			<input type="checkbox" {checked} onchange={() => updateCheckbox(index)} />
		{/each}
	</div>
	<p class="code output">{str}</p>
</div>

<style>
	.grid {
		width: 8rem;
		height: 8rem;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
	}

	p {
		margin: 0;
		margin-top: 1rem;
	}
</style>
