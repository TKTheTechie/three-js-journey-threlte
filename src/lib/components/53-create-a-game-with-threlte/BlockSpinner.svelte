<script lang="ts">
	import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat';
	import { T, useTask } from '@threlte/core';
	import { AutoColliders, RigidBody } from '@threlte/rapier';
	import { Clock, type BoxGeometry, type MeshStandardMaterial, Quaternion, Euler } from 'three';

	export let position: [number, number, number] = [0, 0, 0];

	export let geometry: BoxGeometry;
	export let floorMaterial: MeshStandardMaterial;
	export let obstacleMaterial: MeshStandardMaterial;

	let spinner: RigidBodyType;

	let clock = new Clock();

	const speed = (Math.random() + 0.2) * (Math.random() > 0.5 ? 1 : -1);

	useTask((deltaTime) => {
		let time = clock.getElapsedTime();
		const rotation = new Quaternion();
		rotation.setFromEuler(new Euler(0, time * speed, 0));
		spinner.setNextKinematicRotation(rotation);
	});
</script>

<T.Group {position}>
	<T.Mesh
		position={[0, -0.1, 0]}
		{geometry}
		material={floorMaterial}
		scale={[4, 0.2, 4]}
		receiveShadow
	/>
	<RigidBody type="kinematicPosition" bind:rigidBody={spinner}>
		<AutoColliders shape={'cuboid'} restitution={0.2} friction={0}>
			<T.Mesh
				{geometry}
				material={obstacleMaterial}
				scale={[3.5, 0.3, 0.3]}
				castShadow
				position={[0, 0.3, 0]}
			/>
		</AutoColliders>
	</RigidBody>
</T.Group>
