<script lang="ts">
	import { T } from '@threlte/core';
	import type { BoxGeometry, MeshStandardMaterial } from 'three';
	import { Float, Text } from '@threlte/extras';
	export let position: [number, number, number] = [0, 0, 0];

	export let geometry: BoxGeometry;
	export let material: MeshStandardMaterial;
</script>

<T.Group {position}>
	<Float floatIntensity={0.25}>
		<Text
			scale={5}
			text={'Marble Race'}
			position={[1.5, 1, 0]}
			maxWidth={0.25}
			lineHeight={0.75}
			rotation={[0, Math.PI, 0]}
		/>
	</Float>
	<T.Mesh position={[0, -0.1, 0]} {geometry} {material} scale={[4, 0.2, 4]} receiveShadow />
</T.Group>
