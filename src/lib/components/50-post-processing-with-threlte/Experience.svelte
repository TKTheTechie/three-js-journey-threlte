<script lang="ts">
	import { T, extend, useFrame, useThrelte, useTask } from '@threlte/core';
	import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
	import { OrbitControls, HTML } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { Button, Pane, Slider } from 'svelte-tweakpane-ui';
	import {
		ACESFilmicToneMapping,
		SRGBColorSpace,
		type DirectionalLight,
		type Group,
		type Mesh,
		Camera,
		PerspectiveCamera,
		Color,
		Vector2
	} from 'three';
	import {
		BlendFunction,
		BloomEffect,
		EffectComposer,
		DepthOfFieldEffect,
		EffectPass,
		GlitchEffect,
		GlitchMode,
		NoiseEffect,
		RenderPass,
		VignetteEffect
	} from 'postprocessing';

	import DrunkEffect from './DrunkEffect';

	let frequency: number = 10,
		amplitude: number = 0.1;

	let cubeMesh: Mesh;
	let groupRef: Group;

	let camera: PerspectiveCamera;

	const { scene, renderer, autoRender, renderStage } = useThrelte();

	const { start, stop, started } = useFrame(
		(ctx, deltaTime) => {
			// const angle = ctx.clock.getElapsedTime();
			// ctx.camera.current.position.x = Math.sin(angle) * 8;
			// ctx.camera.current.position.z = Math.cos(angle) * 8;
			// ctx.camera.current.lookAt(0, 0, 0);
			cubeMesh.rotateY(deltaTime);
		},
		{ autostart: true }
	);

	extend({ Color });

	const composer = new EffectComposer(renderer);

	const setupEffectComposer = (camera: Camera) => {
		composer.removeAllPasses();
		composer.addPass(new RenderPass(scene, camera));

		// const dotScreenEffect = new DotScreenEffect();
		// composer.addPass(new EffectPass(camera, dotScreenEffect));

		// const effect = new VignetteEffect();
		// effect.darkness = 0.9;
		// effect.offset = 0.3;
		// effect.blendMode.blendFunction = BlendFunction.NORMAL;

		// const effect = new GlitchEffect();
		// effect.mode = GlitchMode.SPORADIC;
		// effect.minDelay = 1.0;
		// effect.maxDelay = 5.0;
		// effect.minDuration = 0.1;
		// effect.maxDuration = 0.2;
		// effect.minStrength = 0.1;
		// effect.maxStrength = 0.2;

		// const effect = new NoiseEffect();
		// effect.blendMode.blendFunction = BlendFunction.SOFT_LIGHT;
		// effect.setPremultiplied(true);

		// const effect = new UnrealBloomPass( new Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );

		// const effect = new BloomEffect();
		// effect.intensity = 1.0;
		// effect.luminanceMaterial.threshold = 0.2;
		// effect.luminanceMaterial.toneMapped = false;

		// const effect = new DepthOfFieldEffect();
		// effect.bokehScale = 8.0;

		const effect = new DrunkEffect(frequency, amplitude, BlendFunction.DARKEN, 0);

		composer.addPass(new EffectPass(camera, effect));
	};

	$: setupEffectComposer(camera);

	onMount(() => {
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.outputColorSpace = SRGBColorSpace;
		let before = autoRender.current;
		autoRender.set(false);
		return () => {
			autoRender.set(before);
		};
		start();
	});

	useTask(
		(delta) => {
			composer.render(delta);
		},
		{ stage: renderStage, autoInvalidate: false }
	);
</script>

<Pane title="DrunkEffect" position="fixed">
	<Slider bind:value={frequency} label="Frequency" min={0} max={25} />
	<Slider bind:value={amplitude} label="Amplitude" min={0} max={1} step={0.1} />
	<Button label="Apply" title="Apply" on:click={() => setupEffectComposer(camera)} />
</Pane>

<T.Color attach="background" args={['black']} />

<T.PerspectiveCamera
	position={[0, 0, 5]}
	fov={45}
	near={0.1}
	far={200}
	makeDefault
	let:ref
	bind:ref={camera}
>
	<OrbitControls args={[ref]} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[1, 2, 3]} intensity={1.5} />

<T.Group bind:ref={groupRef}>
	<T.Mesh position={[-2, 0, 0]}>
		<T.SphereGeometry />
		<T.MeshStandardMaterial color={'white'} emissive={'orange'} emissiveIntensity={10} />
	</T.Mesh>
	<T.Mesh
		scale={[1.5, 1.5, 1.5]}
		rotation={[0, Math.PI * 0.25, 0]}
		position={[2, 0, 0]}
		bind:ref={cubeMesh}
	>
		<T.BoxGeometry />
		<T.MeshStandardMaterial color={'purple'} />
		<!-- <T.MeshBasicMaterial color={'white'} toneMapped={false} /> -->
	</T.Mesh>
</T.Group>
<T.Mesh position={[0, -1, 0]} rotation={[-Math.PI * 0.5, 0, 0]} scale={10}>
	<T.PlaneGeometry />
	<T.MeshStandardMaterial color="greenyellow" />
</T.Mesh>
