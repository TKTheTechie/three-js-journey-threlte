<script lang="ts">
	import { T, useFrame, useThrelte, extend, useLoader } from '@threlte/core';
	import { OrbitControls, Align, useTexture } from '@threlte/extras';
	import { onMount } from 'svelte';
	import {
		ACESFilmicToneMapping,
		Mesh,
		MeshMatcapMaterial,
		SRGBColorSpace,
		Texture,
		TorusGeometry
	} from 'three';
	import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
	import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader';
	import Text3D from './Text3D.svelte';

	let matcapMaterial: MeshMatcapMaterial;
	let torusGeometry: TorusGeometry;

	let donuts: Array<Mesh> = [...Array(100)];

	const matcapLoader = useTexture('./matcap/7B5254_E9DCC7_B19986_C8AC91.png');
	let font: Font;

	const fontLoader = useLoader(FontLoader).load('./font/Bangers_Regular.json');

	let matcapTexture: Texture;

	extend({ TextGeometry, MeshMatcapMaterial });

	const { camera, scene, renderer } = useThrelte();

	const { start, stop, started } = useFrame(
		(ctx, deltaTime) => {
			for (const donut of donuts) {
				if (donut) donut.rotation.y += deltaTime * 0.2;
			}
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

{#await Promise.all([matcapLoader, fontLoader]) then [texture, font]}
	<T.MeshMatcapMaterial matcap={texture} bind:ref={matcapMaterial} />
	<T.Group name="donutGroup">
		{#each { length: 100 } as _, i}
			<T.Mesh
				bind:ref={donuts[i]}
				material={matcapMaterial}
				geometry={torusGeometry}
				position={[Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5]}
				scale={0.2 + Math.random() * 0.2}
				rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
			/>
		{/each}
	</T.Group>

	<T.TorusGeometry bind:ref={torusGeometry} />

	<Align x={0} y={false} z={false}>
		<T.Mesh material={matcapMaterial}>
			<!-- <T.TextGeometry
				args={[
					'Hello Threlte!',
					{
						font: font,
						size: 0.4,
						height: 0.22,
						curveSegments: 22,
						bevelEnabled: true,
						bevelThickness: 0.01,
						bevelSize: 0.01,
						bevelOffset: 0,
						bevelSegments: 5
					}
				]}
			/> -->
			<Text3D {font} text={'Hello Threlte!'} />
		</T.Mesh>
	</Align>
{/await}
