<script lang="ts">
	import { T, useFrame, useThrelte } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { ACESFilmicToneMapping, SRGBColorSpace, type Group, type Mesh, Color } from 'three';
	import Lights from './Lights.svelte';
	import Level from './Level.svelte';
	import { Debug, World } from '@threlte/rapier';
	import Player from './Player.svelte';

	let cubeMesh: Mesh;
	let groupRef: Group;

	const { camera, scene, renderer } = useThrelte();

	const { start, stop, started } = useFrame(
		(ctx, deltaTime) => {
			// const angle = ctx.clock.getElapsedTime();
			// ctx.camera.current.position.x = Math.sin(angle) * 8;
			// ctx.camera.current.position.z = Math.cos(angle) * 8;
			// ctx.camera.current.lookAt(0, 0, 0);
			// cubeMesh.rotateY(deltaTime);
		},
		{ autostart: false }
	);

	onMount(() => {
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.outputColorSpace = SRGBColorSpace;
	});

	let count = 6;
</script>

<T.Color args={['#bdedfc']} attach="background" />

<World>
	<!-- <Debug /> -->
	<Lights />
	<Level />
	<Player />
</World>
