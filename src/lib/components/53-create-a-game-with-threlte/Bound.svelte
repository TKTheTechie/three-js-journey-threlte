<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { AutoColliders, RigidBody, Collider } from '@threlte/rapier';
	import type { BoxGeometry, MeshStandardMaterial } from 'three';
	export let count;
	export let material: MeshStandardMaterial;
	export let geometry: BoxGeometry;
</script>

<RigidBody type="fixed">
	<AutoColliders shape={'cuboid'} restitution={0.2} friction={0}>
		<T.Mesh
			position={[2.15, 0.75, count * 2 + 2]}
			{geometry}
			{material}
			scale={[0.3, 1.5, 4 * (count + 2)]}
			castShadow
		/>

		<T.Mesh
			position={[-2.15, 0.75, count * 2 + 2]}
			{geometry}
			{material}
			scale={[0.3, 1.5, 4 * (count + 2)]}
			receiveShadow
		/>
		<T.Mesh
			position={[0, 0.75, (count + 1.5) * 4]}
			{geometry}
			{material}
			scale={[4, 1.5, 0.3]}
			receiveShadow
		/>
	</AutoColliders>
	<T.Group position={[0, -0.1, count * 2 + 2]}>
		<Collider shape={'cuboid'} args={[2, 0.1, 2 * (count + 2)]} friction={1} restitution={0.2} />
	</T.Group>
</RigidBody>
