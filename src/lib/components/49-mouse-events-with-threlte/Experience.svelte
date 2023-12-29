<script lang="ts">
	import { T, extend, useFrame, useThrelte } from '@threlte/core';
	import { OrbitControls, interactivity } from '@threlte/extras';
	import { onMount } from 'svelte';
	import {
		ACESFilmicToneMapping,
		SRGBColorSpace,
		type Group,
		type Mesh,
		Color,
		MeshStandardMaterial
	} from 'three';
	import Hamburger from '../models/Hamburger.svelte';

	let cubeMesh: Mesh;
	let cube: MeshStandardMaterial;
	let groupRef: Group;

	const { camera, scene, renderer } = useThrelte();

	interactivity();

	const { start, stop, started } = useFrame(
		(ctx, deltaTime) => {
			// const angle = ctx.clock.getElapsedTime();
			// ctx.camera.current.position.x = Math.sin(angle) * 8;
			// ctx.camera.current.position.z = Math.cos(angle) * 8;
			// ctx.camera.current.lookAt(0, 0, 0);
			cubeMesh.rotateY(deltaTime);
		},
		{ autostart: false }
	);

	const eventHandler = (event) => {
		cube.color = new Color(Math.random(), Math.random(), Math.random());
	};

	onMount(() => {
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.outputColorSpace = SRGBColorSpace;
		start();
	});
</script>

<T.PerspectiveCamera position={[0, 0, 5]} fov={45} near={0.1} far={200} makeDefault let:ref>
	<OrbitControls args={[ref]} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[1, 2, 3]} intensity={1.5} />

<T.Group bind:ref={groupRef}>
	<T.Mesh
		position={[-2, 0, 0]}
		on:click={(event) => {
			event.stopPropagation();
		}}
	>
		<T.SphereGeometry />
		<T.MeshStandardMaterial color={'orange'} />
	</T.Mesh>
	<T.Mesh
		scale={[1.5, 1.5, 1.5]}
		rotation={[0, Math.PI * 0.25, 0]}
		position={[2, 0, 0]}
		bind:ref={cubeMesh}
		on:pointerenter={() => {
			document.body.style.cursor = 'pointer';
		}}
		on:pointerleave={() => {
			document.body.style.cursor = 'default';
		}}
	>
		<T.BoxGeometry />
		<T.MeshStandardMaterial bind:ref={cube} />
	</T.Mesh>
</T.Group>
<T.Mesh position={[0, -1, 0]} rotation={[-Math.PI * 0.5, 0, 0]} scale={10}>
	<T.PlaneGeometry />
	<T.MeshStandardMaterial color="greenyellow" />
</T.Mesh>

<Hamburger
	scale={0.2}
	on:click={(event) => {
		console.log(event.object.name);
		event.stopPropagation();
	}}
/>
