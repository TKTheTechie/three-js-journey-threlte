<script lang="ts">
	import { T, extend, useFrame, useThrelte } from '@threlte/core';
	import {
		Align,
		OrbitControls,
		Environment,
		Float,
		ContactShadows,
		HTML,
		Text
	} from '@threlte/extras';
	import { onMount } from 'svelte';
	import {
		ACESFilmicToneMapping,
		SRGBColorSpace,
		RectAreaLight,
		type DirectionalLight,
		type Group,
		type Mesh,
		Color,
		AmbientLight
	} from 'three';
	import Laptop from '../models/Laptop.svelte';

	const { camera, scene, renderer } = useThrelte();

	extend({ Color, RectAreaLight });

	const { start, stop, started } = useFrame((ctx, deltaTime) => {}, { autostart: false });

	onMount(() => {
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.outputColorSpace = SRGBColorSpace;
		start();
	});
</script>

<T.Color args={['#241a1a']} attach="background" />
<T.PerspectiveCamera position={[-2, 1, 5]} fov={45} near={0.1} far={200} makeDefault let:ref>
	<OrbitControls args={[ref]} maxPolarAngle={1.5} minAzimuthAngle={-1} maxAzimuthAngle={0.75} />
</T.PerspectiveCamera>
<T.AmbientLight intensity={1} />
<Float rotationIntensity={0.4} floatIntensity={2}>
	<T.RectAreaLight
		width={2.5}
		height={1.65}
		intensity={65}
		color={'#26ca84'}
		rotation={[-0.1, Math.PI, 0]}
		position={[0, 0.55, -1.15]}
	/>
	<Laptop position={[0, -1.4, 0]} />
	<HTML transform distanceFactor={1.17} position={[0, 0.1, -1.4]} rotation.x={-0.256}>
		<div class="website">
			<iframe src="https://tkthetechie.io" title="TKTheTechie.io" />
		</div>
	</HTML>
	<Text
		font="./font/bangers.regular.ttf"
		fontSize={0.5}
		position={[2, 0.75, 0.75]}
		rotation.y={-1.25}
		text="TKTheTechie"
	/>
</Float>
<ContactShadows position.y={-1.4} opacity={0.4} scale={5} blur={2.4} />

<style>
	.website iframe {
		width: 1024px;
		height: 670px;
		border: none;
		background: #000000;
	}
</style>
