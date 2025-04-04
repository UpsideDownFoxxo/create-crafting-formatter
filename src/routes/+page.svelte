<script>
	import ItemSequence from '$lib/item_sequence.svelte';
	import SlotConfig from '$lib/slot_config.svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="/global.css" />
</svelte:head>
<div class="main">
	<ItemSequence></ItemSequence>
	<SlotConfig></SlotConfig>
</div>

<style>
	.main {
		display: table;
	}
</style>
