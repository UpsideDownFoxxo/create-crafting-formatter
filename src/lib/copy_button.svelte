<script lang="ts">
	import { base } from '$app/paths';
	let button = $state() as HTMLButtonElement;

	function animate() {
		button.animate([{ transform: 'scale(0.9,0.9)' }], {
			duration: 120,
			direction: 'alternate',
			iterations: 2
		});

		if (valid) {
			try {
				navigator.clipboard.writeText(text);
			} catch {
				console.log('No clipboard for you... sorry');
			}
		}
	}

	let { text, valid } = $props();
</script>

<div class="container">
	<h2 class="header">Finished Code</h2>
	<div class="content code output">
		<p class="code">{text}</p>
		<button bind:this={button} onclick={animate} disabled={!valid}>
			<img src="{base}/copy-icon.svg" alt="" />
		</button>
	</div>
</div>

<style>
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	h2 {
		margin-bottom: 1rem;
	}

	p {
		margin: 0;
	}

	button {
		width: 2rem;
		height: 2rem;
		background: none;
		border: none;
		border-radius: 4px;
		transition: transform 120ms;
	}

	img {
		width: 100%;
	}

	img:hover {
		opacity: 90%;
	}

	button:hover {
		transform: scale(1.1, 1.1);
	}
</style>
