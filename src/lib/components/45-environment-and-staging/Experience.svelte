<script lang="ts">
	import { T, extend, useFrame, useThrelte } from '@threlte/core';
	import { OrbitControls, TransformControls, SoftShadows, Sky, Environment } from '@threlte/extras';
	import { onMount } from 'svelte';
	import {
		ACESFilmicToneMapping,
		SRGBColorSpace,
		type Group,
		type Mesh,
		DirectionalLight,
		Vector3,
		PlaneGeometry,
		MeshBasicMaterial
	} from 'three';

	import { Pane, Slider } from 'svelte-tweakpane-ui';

	let cubeMesh: Mesh, sphereMesh: Mesh;
	let groupRef: Group;
	let sunPosition: number = 0;
	let envMapIntensity: number = 1;

	let directionalLight: DirectionalLight;

	const { camera, scene, renderer } = useThrelte();

	extend({ TransformControls });

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

<!-- <Pane title="sky" position="fixed">
	<Slider bind:value={sunPosition} label="Elevation" min={-25} max={25} />
</Pane> -->

<SoftShadows samples={50} focus={5} />

<!-- <T.Color args={['ivory']} attach="background" /> -->
<!-- <Sky elevation={sunPosition} />

<T.DirectionalLight
	intensity={1.0}
	position={[1, 2, 3]}
	castShadow={true}
	bind:ref={directionalLight}
	shadow.mapSize={[1024, 1024]}
	shadow.camera.near={1}
	shadow.camera.far={10}
	shadow.camera.top={5}
	shadow.camera.right={5}
	shadow.camera.bottom={-5}
	shadow.camera.left={-5} 
>-->
<!-- {#if directionalLight}
		<Portal object={scene}>
			<T.CameraHelper args={[directionalLight.shadow.camera]} />
		</Portal>
	{/if} -->
<!-- </T.DirectionalLight> -->
<Pane title="Environment" position="fixed">
	<Slider bind:value={envMapIntensity} label="Intensity" min={0} max={32} />
</Pane>
<T.PerspectiveCamera position={[0, 0, 5]} fov={45} near={0.1} far={200} makeDefault let:ref>
	<OrbitControls args={[ref]} />
</T.PerspectiveCamera>
<Environment
	path="./environmentMaps/"
	files={'the_sky_is_on_fire_2k.hdr'}
	isBackground
	groundProjection={{ radius: 200, height: 7, scale: 100 }}
/>

<T.Group bind:ref={groupRef}>
	<T.Mesh position={[-2, 1, 0]} let:ref ref={sphereMesh} castShadow>
		<T.SphereGeometry />
		<T.MeshStandardMaterial color={'orange'} {envMapIntensity} />
	</T.Mesh>
	<T.Mesh
		scale={[1.5, 1.5, 1.5]}
		rotation={[0, Math.PI * 0.25, 0]}
		position={[2, 0, 0]}
		bind:ref={cubeMesh}
		let:ref
		castShadow
	>
		<T.BoxGeometry />
		<T.MeshStandardMaterial color={'mediumpurple'} {envMapIntensity} />
	</T.Mesh>
</T.Group>

<!-- <T.Mesh position={[0, -1, 0]} rotation={[-Math.PI * 0.5, 0, 0]} scale={100}> -->
<!-- <T.PlaneGeometry /> -->
<!-- <T.MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={1} bind:ref={meshRelectorMaterial}/> -->
<!-- <T.MeshStandardMaterial color="greenyellow" {envMapIntensity} /> -->
<!-- </T.Mesh> -->
