<script lang="ts">
	import { T } from '@threlte/core';
	import { useGltf, useSuspense } from '@threlte/extras';

	const suspend = useSuspense();

	// const model = suspend(useGltf('./FlightHelmet/glTF/FlightHelmet.gltf'));

	const model = suspend(useGltf('./hamburger-draco.glb', { useDraco: true }));
</script>

{#await model then { scene }}
	<T.Group {...$$restProps}>
		<T is={scene.clone()} />
	</T.Group>
{/await}
