<script lang="ts">
	import { T, extend, useFrame, useTask, useThrelte } from '@threlte/core';
	import { OrbitControls, interactivity, Audio, AudioListener, GLTF } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { FpsGraph, Pane } from 'svelte-tweakpane-ui';
	import {
		ACESFilmicToneMapping,
		SRGBColorSpace,
		AmbientLight,
		Mesh,
		Vector3,
		Euler,
		Quaternion,
		Clock,
		type Audio as AudioType,
		MeshStandardMaterial,
		BoxGeometry,
		Matrix4
	} from 'three';
	import { RigidBody, Debug, AutoColliders, Collider, World } from '@threlte/rapier';
	import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat';
	import Emitter from './Emitter.svelte';

	const { camera, scene, renderer } = useThrelte();

	const cubesCount = 3;

	let cubeMesh: Mesh, cube: RigidBodyType, twister: RigidBodyType;
	let hitAudio: AudioType;

	extend({ AmbientLight });

	let clock = new Clock();

	interactivity();

	const { start, stop, started, task } = useTask((deltaTime) => {
		const time = clock.getElapsedTime();

		const eulerRotation = new Euler(0, time * 3, 0);

		const queternionRotation = new Quaternion();
		queternionRotation.setFromEuler(eulerRotation);
		twister.setNextKinematicRotation(queternionRotation);

		const angle = time * 0.5;
		const x = Math.cos(angle) * 2;
		const z = Math.sin(angle) * 2;
		twister.setNextKinematicTranslation(new Vector3(x, 0, z));
	});

	onMount(() => {
		renderer.toneMapping = ACESFilmicToneMapping;
		renderer.outputColorSpace = SRGBColorSpace;
	});

	const cubeJump = () => {
		cube.applyImpulse(new Vector3(-0.5, 5 * cube.mass(), 0), true);
		cube.applyTorqueImpulse(
			new Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5),
			true
		);
	};

	const collisionEnter = () => {
		// hitAudio.setVolume(Math.random());
		// hitAudio.play();
	};
</script>

<World>
	<Debug />

	<Pane title="FPS" position="fixed">
		<FpsGraph />
	</Pane>
	<T.PerspectiveCamera position={[0, 0, 5]} fov={45} near={0.1} far={200} makeDefault let:ref>
		<AudioListener />
		<OrbitControls args={[ref]} />
	</T.PerspectiveCamera>

	<Audio src={'/hit.mp3'} bind:ref={hitAudio} />

	<T.DirectionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
	<T.AmbientLight intensity={0.2} />
	<!-- <RigidBody type={'dynamic'}>
	<AutoColliders shape={'ball'} restitution={1.1}>
		<T.Mesh position={[-1.5, 2, 0]} castShadow>
			<T.SphereGeometry />
			<T.MeshStandardMaterial color={'orange'} />
		</T.Mesh>
	</AutoColliders>
</RigidBody> -->
	<RigidBody
		bind:rigidBody={cube}
		gravityScale={1}
		on:collisionenter={collisionEnter}
		on:sleep={() => console.log('sleep')}
		on:wake={() => console.log('wake')}
	>
		<!-- on:collisionexit={() => console.log('exit')} -->
		<AutoColliders shape={'cuboid'} friction={0.7}>
			<T.Mesh position={[1.5, 2, 0]} castShadow bind:ref={cubeMesh} on:click={cubeJump}>
				<Collider shape={'cuboid'} args={[0.5, 0.5, 0.5]} mass={10} />
				<T.BoxGeometry />
				<T.MeshStandardMaterial color={'mediumpurple'} />
			</T.Mesh>
		</AutoColliders>
	</RigidBody>

	<!-- <RigidBody>
	<AutoColliders shape={'trimesh'}>
	<T.Mesh position={[0, 1, 0]} castShadow rotation.x={Math.PI * 0.5}>
		<Collider shape={'ball'} args={[1.5]} />
		<T.TorusGeometry args={[1, 0.5, 16, 32]} />
		<T.MeshStandardMaterial color={'mediumpurple'} />
	</T.Mesh>
	</AutoColliders>
</RigidBody> -->
	<RigidBody type={'fixed'}>
		<AutoColliders shape={'cuboid'} friction={0.7}>
			<T.Mesh receiveShadow position.y={-1.25}>
				<T.BoxGeometry args={[10, 0.5, 10]} />
				<T.MeshStandardMaterial color="greenyellow" />
			</T.Mesh>
		</AutoColliders>
	</RigidBody>

	<RigidBody type={'fixed'}>
		<T.Group position={[0, 1, 5.25]}>
			<Collider shape={'cuboid'} args={[5, 2, 0.5]} />
		</T.Group>
		<T.Group position={[0, 1, -5.25]}>
			<Collider shape={'cuboid'} args={[5, 2, 0.5]} />
		</T.Group>
		<T.Group position={[5.25, 1, 0]}>
			<Collider shape={'cuboid'} args={[0.5, 2, 5]} />
		</T.Group>
		<T.Group position={[-5.25, 1, 0]}>
			<Collider shape={'cuboid'} args={[0.5, 2, 5]} />
		</T.Group>
	</RigidBody>

	<RigidBody type={'kinematicPosition'} gravityScale={1.5} bind:rigidBody={twister}>
		<AutoColliders shape={'cuboid'}>
			<T.Mesh castShadow scale={[0.4, 0.4, 3]} position={[0, -0.8, 0]}>
				<T.BoxGeometry />
				<T.MeshStandardMaterial color={'red'} />
			</T.Mesh>
		</AutoColliders>
	</RigidBody>

	<Emitter />

	<!-- <Hamburger scale={0.25} /> -->
</World>
