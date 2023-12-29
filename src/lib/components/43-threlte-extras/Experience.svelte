<script lang="ts">
	import { T, extend, useFrame, useThrelte } from '@threlte/core';
	import { OrbitControls, TransformControls, HTML, Text, Float } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { ACESFilmicToneMapping, SRGBColorSpace, type Group, type Mesh } from 'three';
	import MeshReflectorMaterial from '@react-three/drei';

	let cubeMesh: Mesh, sphereMesh: Mesh;
	let groupRef: Group;

	const { camera, scene, renderer } = useThrelte();

	extend({ TransformControls, MeshReflectorMaterial });

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
		start();
	});
</script>

<T.PerspectiveCamera position={[0, 0, 5]} fov={45} near={0.1} far={200} makeDefault let:ref>
	<OrbitControls args={[ref]} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[1, 2, 3]} intensity={1.5} />

<T.Group bind:ref={groupRef}>
	<T.Mesh position={[-2, 0, 0]} let:ref ref={sphereMesh}>
		<T.SphereGeometry />
		<T.MeshStandardMaterial color={'orange'} />
		<HTML position={[1, 1, 0]} center distanceFactor={3} occlude={[ref, cubeMesh]}>
			<div class="label">That's a sphere 👍!</div>
		</HTML>
		<TransformControls object={ref} mode={'translate'} />
	</T.Mesh>
	<T.Mesh
		scale={[1.5, 1.5, 1.5]}
		rotation={[0, Math.PI * 0.25, 0]}
		position={[2, 0, 0]}
		bind:ref={cubeMesh}
		let:ref
	>
		<T.BoxGeometry />
		<T.MeshStandardMaterial color={'mediumpurple'} />
		<TransformControls object={ref} mode={'translate'} />
	</T.Mesh>
</T.Group>

<T.Mesh position={[0, -1, 0]} rotation={[-Math.PI * 0.5, 0, 0]} scale={10}>
	<T.PlaneGeometry />
	<!-- <T.MeshStandardMaterial color="greenyellow" /> -->
	<T.MeshReflectorMaterial />
</T.Mesh>

<Float speed={5} floatIntensity={2}>
	<Text
		font={'/font/bangers.regular.ttf'}
		color={'salmon'}
		fontSize={0.3}
		text="I LOVE THRELTE!"
		position={[0, 2, 0]}
		textAlign={'center'}
	/>
</Float>

<style>
	.label {
		font-family: Arial, Helvetica;
		background-color: #000;
		color: #fff;
		padding: 15px;
		border-radius: 30px;
		user-select: none;
		overflow: hidden;
		color: white;
		position: absolute;
		white-space: nowrap;
	}
</style>
