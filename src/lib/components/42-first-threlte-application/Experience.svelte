<script lang="ts">
	import { T, extend, useFrame, useThrelte } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { onMount } from 'svelte';
	import {
		ACESFilmicToneMapping,
		SRGBColorSpace,
		type DirectionalLight,
		type Group,
		type Mesh
	} from 'three';
	import CustomObject from './CustomObject.svelte';

	let cubeMesh: Mesh;
	let groupRef: Group;

	const { camera, scene, renderer } = useThrelte();

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
	<T.Mesh position={[-2, 0, 0]}>
		<T.SphereGeometry />
		<T.MeshStandardMaterial color={'orange'} />
	</T.Mesh>
	<T.Mesh
		scale={[1.5, 1.5, 1.5]}
		rotation={[0, Math.PI * 0.25, 0]}
		position={[2, 0, 0]}
		bind:ref={cubeMesh}
	>
		<T.BoxGeometry />
		<T.MeshStandardMaterial color={'mediumpurple'} />
	</T.Mesh>
</T.Group>
<T.Mesh position={[0, -1, 0]} rotation={[-Math.PI * 0.5, 0, 0]} scale={10}>
	<T.PlaneGeometry />
	<T.MeshStandardMaterial color="greenyellow" />
</T.Mesh>

<CustomObject />
