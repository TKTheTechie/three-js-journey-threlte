<script lang="ts">
	import { T, extend, useFrame, useThrelte, useLoader } from '@threlte/core';
	import {
		OrbitControls,
		TransformControls,
		HTML,
		Text,
		Float,
		useGltf,
		Suspense
	} from '@threlte/extras';
	import { onMount } from 'svelte';
	import {
		ACESFilmicToneMapping,
		SRGBColorSpace,
		type Group,
		Mesh,
		BoxGeometry,
		MeshBasicMaterial
	} from 'three';
	import Model from './Model.svelte';
	import Hamburger from '../models/Hamburger.svelte';
	import Fox from './Fox.svelte';

	let cubeMesh: Mesh, sphereMesh: Mesh;
	let groupRef: Group;

	const { camera, scene, renderer } = useThrelte();

	// const model = useGltf('./hamburger-draco.glb', { useDraco: true });

	extend({ TransformControls });

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

<T.DirectionalLight position={[1, 2, 3]} intensity={1.5} castShadow shadow.normalBias={0.04} />
<T.AmbientLight intensity={0.2} />

<T.Mesh position={[0, -1, 0]} rotation={[-Math.PI * 0.5, 0, 0]} scale={10} receiveShadow>
	<T.PlaneGeometry />
	<T.MeshStandardMaterial color="greenyellow" />
</T.Mesh>

<Suspense final>
	<div slot="fallback">
		<T.Mesh position-y={0.5} scale={[2, 3, 2]}>
			<T.BoxGeometry args={[1, 1, 1, 2, 2, 2]} />
			<T.MeshBasicMaterial wireframe={true} color="red" />
		</T.Mesh>
	</div>
	<!-- <Model position.x={-4} name="b0" scale={0.35} />
	<Model position.x={0} name="b1" scale={0.35} />
	<Model position.x={4} name="b2" scale={0.35} /> -->
	<!-- <Hamburger position.x={-4} name="b0" scale={0.35} /> -->
	<Hamburger position.x={0} name="b1" scale={0.35} />
	<!-- <Hamburger position.x={4} name="b2" scale={0.35} /> -->

	<Fox />
</Suspense>
