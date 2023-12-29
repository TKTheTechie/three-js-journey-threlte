<script lang="ts">
	import { T, forwardEventHandlers } from '@threlte/core';
	import { TextGeometry, type TextGeometryParameters } from 'three-stdlib';

	const component = forwardEventHandlers();

	export let font: TextGeometryParameters['font'];
	export let text: string;

	export let bevelEnabled: TextGeometryParameters['bevelEnabled'] = false;
	export let bevelOffset: TextGeometryParameters['bevelOffset'] = 0;
	export let bevelSize: TextGeometryParameters['bevelSize'] = 0.01;
	export let bevelThickness: TextGeometryParameters['bevelThickness'] = 0.1;
	export let curveSegments: TextGeometryParameters['curveSegments'] = 8;
	export let height: TextGeometryParameters['height'] = 0.2;
	export let size: TextGeometryParameters['size'] = 1;
	export let lineHeight: TextGeometryParameters['lineHeight'] = 1;
	export let letterSpacing: TextGeometryParameters['letterSpacing'] = 0;

	export const ref = new TextGeometry(text, {
		font: font,
		size: size,
		height: height,
		curveSegments: curveSegments,
		bevelEnabled: bevelEnabled,
		bevelThickness: bevelThickness,
		bevelSize: bevelSize,
		bevelOffset: bevelOffset,
		lineHeight: lineHeight,
		letterSpacing: letterSpacing
	});
</script>

<T is={ref} let:ref {...$$restProps} bind:this={$component}>
	<slot {ref} />
</T>
