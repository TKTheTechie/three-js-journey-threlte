<script lang="ts">
	import { T, useFrame, useThrelte, extend, useLoader } from '@threlte/core';
	import { OrbitControls, Align } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { BoxGeometry, Color, MeshNormalMaterial, NoToneMapping, SRGBColorSpace } from 'three';
	import Portal from '../models/portal.svelte';
	import Sparkles from './Sparkles.svelte';

	const { camera, scene, renderer } = useThrelte();

	extend({ Color });

	const { start, stop, started } = useFrame((ctx, deltaTime) => {}, { autostart: false });

	onMount(() => {
		renderer.toneMapping = NoToneMapping;
		renderer.outputColorSpace = SRGBColorSpace;
		start();
	});
</script>

<T.Color args={['#030202']} attach="background" />

<T.PerspectiveCamera position={[0, 0, 5]} fov={45} near={0.1} far={200} makeDefault let:ref>
	<OrbitControls args={[ref]} />
</T.PerspectiveCamera>
<Align x={0} y={0} z={0}>
	<Portal />
	<Sparkles scale={[4, 2, 4]} size={6} position={[0, 1, 0]} />
	<T.Mesh scale={0.0001}>
		<T.BoxGeometry />
		<T.MeshNormalMaterial />
	</T.Mesh>
</Align>
