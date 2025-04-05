<script lang="ts">
	import { base } from '$app/paths';
	import ItemSequence from '$lib/item_sequence.svelte';
	import SlotConfig from '$lib/slot_config.svelte';
	import { writable } from 'svelte/store';

	let checkedNum = writable(0);
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
		rel="stylesheet"
	/>

	<link rel="stylesheet" href="{base}/global.css" />
</svelte:head>

<div class="main">
	<ItemSequence limit={$checkedNum}></ItemSequence>
	<SlotConfig checkedNumUpdate={(n: number) => ($checkedNum = n)}></SlotConfig>
</div>

<style>
	.main {
		display: table;
	}
</style>
