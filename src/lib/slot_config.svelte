<script lang="ts">
	const s = [0, 3, 18];

	let { checks, check_str } = $props();

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
	<p class="code output">{check_str}</p>
</div>

<style>
	.grid {
		width: 32rem;
		height: 32rem;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 6px;
		margin: 1rem;
	}

	p {
		margin: 0;
		margin-top: 1rem;
	}

	input[type='checkbox'] {
		width: 90%;
		height: 90%;
		appearance: none;
		background-color: var(--secondary20);
		margin: 0;

		font: inherit;
		color: currentColor;
		border-radius: 1rem;
		transform: translateY(-0.075em);
		cursor: pointer;
		transition: transform 120ms;
		place-self: center;
	}

	input[type='checkbox']:checked {
		background-color: var(--secondary70);
	}

	input[type='checkbox']:hover {
		transform: translate(0, -0.3rem) scale(105%);
		background-color: var(--secondary45);
	}

	input[type='checkbox']:hover:checked {
		background-color: var(--secondary80);
	}
</style>
