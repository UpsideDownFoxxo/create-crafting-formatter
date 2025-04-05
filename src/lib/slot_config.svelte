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
			<input
				type="checkbox"
				class="brass-connected"
				{checked}
				onchange={() => updateCheckbox(index)}
			/>
		{/each}
	</div>
	<p class="code output">{str}</p>
</div>

<style>
	.grid {
		width: 32rem;
		height: 32rem;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0;
	}

	p {
		margin: 0;
		margin-top: 1rem;
	}

	input[type='checkbox'] {
		width: 100%;
		height: 100%;
		appearance: none;
		background-color: #ffffff00;
		margin: 0;
		border: 0;
		padding: 0;

		font: inherit;
		color: currentColor;
		transform: translateY(-0.075em);
		display: grid;
		place-content: center;
	}

	input[type='checkbox']::before {
		content: '';
		width: 2.5rem;
		height: 2.5rem;
		transform: scale(1);
		transition: 120ms transform ease-in-out;
		/* transform-origin: bottom left; */
		background-image: url('https://github.com/Creators-of-Create/Create/blob/mc1.20.1/dev/src/main/resources/assets/create/textures/block/crafter_thingies.png?raw=true');
		background-size: 267%;
		/* background-color: red; */
	}

	input[type='checkbox']:checked::before {
		transform: scale(0);
	}
</style>
