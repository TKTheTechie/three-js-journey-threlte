<script lang="ts">
	import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat';
	import { T, useTask } from '@threlte/core';
	import { AutoColliders, RigidBody } from '@threlte/rapier';
	import {
		Clock,
		type BoxGeometry,
		type MeshStandardMaterial,
		Quaternion,
		Euler,
		Vector3
	} from 'three';

	export let position: [number, number, number] = [0, 0, 0];

	export let geometry: BoxGeometry;
	export let floorMaterial: MeshStandardMaterial;
	export let obstacleMaterial: MeshStandardMaterial;

	let obstacle: RigidBodyType;

	let clock = new Clock();

	const timeOffset = Math.random() * 2 * Math.PI;

	useTask((deltaTime) => {
		let time = clock.getElapsedTime();

		const y = Math.sin(time + timeOffset) + 1.15;

		obstacle.setNextKinematicTranslation(new Vector3(position[0], position[1] + y, position[2]));
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
	<RigidBody type="kinematicPosition" bind:rigidBody={obstacle}>
		<AutoColliders shape={'cuboid'} restitution={0.2} friction={0}>
			<T.Mesh
				{geometry}
				material={obstacleMaterial}
				scale={[3.5, 0.3, 0.3]}
				castShadow
				position={[0, 0.1, 0]}
			/>
		</AutoColliders>
	</RigidBody>
</T.Group>
