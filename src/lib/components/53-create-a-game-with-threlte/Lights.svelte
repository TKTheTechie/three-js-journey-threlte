<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import type { DirectionalLight } from 'three';
	let light: DirectionalLight;

	const { camera } = useThrelte();

	useTask((delta) => {
		light.position.z = camera.current.position.z + 1 - 4;
		light.target.position.z = camera.current.position.z - 4;
		light.target.updateMatrixWorld();
	});
</script>

<T.DirectionalLight
	bind:ref={light}
	castShadow
	position={[4, 4, 1]}
	intensity={2.5}
	shadow.mapSize={[1024, 1024]}
	shadow.camera.near={1}
	shadow.camera.far={10}
	shadow.camera.top={10}
	shadow.camera.bottom={-10}
	shadow.camera.left={-10}
	shadow.camera.right={10}
/>

<T.AmbientLight intensity={0.2} />
