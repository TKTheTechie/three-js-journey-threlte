<script lang="ts">
	import { useKeyboardControls } from 'svelte-kbc';
	import { PHASE, endTime, gamePhase, startTime } from './stores/useGame';
	import { onMount } from 'svelte';

	const { w, a, s, d, space } = useKeyboardControls();

	let elapsedTime = 0;
	let elapsedString = '0.0';

	const timer = () => {
		if ($gamePhase === PHASE.Playing) {
			elapsedTime += Date.now() - $startTime;
		} else if ($gamePhase === PHASE.Ended) elapsedTime = 0.0;
		else if ($gamePhase === PHASE.Finished) elapsedTime = $endTime - $startTime;

		elapsedTime /= 1000;
		elapsedString = elapsedTime.toFixed(2);
		requestAnimationFrame(timer);
	};

	onMount(() => {
		elapsedTime = 0.0;
		elapsedString = '0.0';
	});

	requestAnimationFrame(timer);
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
</svelte:head>

<div class="interface">
	<div class="time">{elapsedString}</div>
	<div
		class="restart"
		style={$gamePhase === PHASE.Finished ? '' : 'display: none;'}
		on:click={() => {
			gamePhase.set(PHASE.Ended);
		}}
	>
		Restart
	</div>
	<div class="controls">
		<div class="raw">
			<div class="key {$w ? 'active' : ''}" />
		</div>
		<div class="raw">
			<div class="key {$a ? 'active' : ''}" />
			<div class="key {$s ? 'active' : ''}" />
			<div class="key {$d ? 'active' : ''}" />
		</div>
		<div class="raw">
			<div class="key large {$space ? 'active' : ''}" />
		</div>
	</div>
</div>

<style>
	.interface {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		font-family: 'Bebas Neue', cursive;
	}

	.time {
		position: absolute;
		top: 15%;
		left: 0;
		width: 100%;
		font-size: 6vh;
		color: #ffffff;
		background: #00000033;
		padding-top: 5px;
		text-align: center;
	}
	.restart {
		display: flex;
		justify-content: center;
		position: absolute;
		top: 40%;
		left: 0;
		width: 100%;
		font-size: 80px;
		color: #ffffff;
		background: #00000033;
		padding-top: 5px;
		pointer-events: auto;
		cursor: pointer;
	}

	.controls {
		position: absolute;
		bottom: 10%;
		left: 0;
		width: 100%;
	}

	.controls .raw {
		display: flex;
		justify-content: center;
	}

	.controls .key {
		width: 40px;
		height: 40px;
		margin: 4px;
		border: 2px solid #ffffff;
		background: #ffffff44;
	}

	.controls .key.large {
		width: 144px;
	}

	.controls .key.active {
		background: #ffffff99;
	}
</style>
