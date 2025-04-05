<script lang="ts">
	import ItemSequence from '$lib/item_sequence.svelte';
	import SlotConfig from '$lib/slot_config.svelte';
	import { writable } from 'svelte/store';

	let checkedNum = writable(0);
</script>

<svelte:head>
	<link rel="stylesheet" href="/global.css" />
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
