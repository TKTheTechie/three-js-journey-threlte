<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './53-create-a-game-with-threlte/Experience.svelte';
	import Interface from './53-create-a-game-with-threlte/Interface.svelte';
	import { KeyboardControls, wasdConfig } from 'svelte-kbc';
</script>

<KeyboardControls config={wasdConfig()}>
	<Interface />
	<Canvas>
		<Scene />
	</Canvas>
</KeyboardControls>
