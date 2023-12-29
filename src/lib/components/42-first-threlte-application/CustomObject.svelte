<script lang="ts">
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	import { DoubleSide } from 'three';
	import type { BufferGeometry, Camera } from 'three';

	let geometryRef: BufferGeometry;

	const verticesCount = 10 * 3;
	const positions = new Float32Array(verticesCount * 3);

	for (let i = 0; i < verticesCount * 3; i++) {
		positions[i] = (Math.random() - 0.5) * 3;
	}

	onMount(() => {
		geometryRef.computeVertexNormals();
	});
</script>

<T.Mesh>
	<T.BufferGeometry bind:ref={geometryRef}>
		<T.BufferAttribute
			attach={(parent, self) => {
				parent.setAttribute('position', self);
				return () => {};
			}}
			count={verticesCount}
			itemSize={3}
			array={positions}
		/>
	</T.BufferGeometry>
	<T.MeshStandardMaterial color="red" side={DoubleSide} />
</T.Mesh>
