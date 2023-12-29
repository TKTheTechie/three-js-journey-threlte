<script lang="ts">
	import { useAnimations } from '@react-three/drei';
	import { T } from '@threlte/core';
	import { useGltf, useSuspense, useGltfAnimations } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { Pane, Slider, Button } from 'svelte-tweakpane-ui';

	import { withPrevious } from 'svelte-previous';

	const suspend = useSuspense();

	const model = suspend(useGltf('./Fox/glTF/Fox.gltf', { useDraco: true }));
	const { gltf, actions, mixer } = useGltfAnimations(model);

	const [currentAnimation, previousAnimation] = withPrevious('Run');

	const animation = 'Run';

	$: {
		console.log($currentAnimation);
		$actions[$currentAnimation]?.reset().fadeIn(0.5).play();
		if ($currentAnimation !== $previousAnimation) {
			$actions[$previousAnimation]?.fadeOut(0.5);
		}
	}
</script>

<Pane title="Fox" position="fixed">
	<Button
		title="Run"
		on:click={() => {
			currentAnimation.set('Run');
		}}
	/>
	<Button
		title="Walk"
		on:click={() => {
			currentAnimation.set('Walk');
		}}
	/>
	<Button
		title="Survey"
		on:click={() => {
			currentAnimation.set('Survey');
		}}
	/>
</Pane>

{#await model then { scene }}
	<T.Group {...$$restProps}>
		<T is={scene} position={[-2.5, 0.0, 2.5]} scale={0.02} rotation-y={0.3} />
	</T.Group>
{/await}
