<script lang="ts">
	import { useFrame, T } from '@threlte/core';
	import {
		Vector2,
		Vector3,
		Vector4,
		Color,
		type ColorRepresentation,
		ShaderMaterial
	} from 'three';
	import { randFloatSpread } from 'three/src/math/MathUtils';
	import { SparkleShader } from './SparklesShader';
	import { BufferGeometry } from 'three';
	import { BufferAttribute } from 'three';

	type SparklesProperties = {
		position: [number, number, number];
		/** Number of particles (default: 100) */
		count: number;
		/** Speed of particles (default: 1) */
		speed: number | Float32Array;
		/** Opacity of particles (default: 1) */
		opacity: number | Float32Array;
		/** Color of particles (default: 100) */
		color: ColorRepresentation | Float32Array;
		/** Color of particles (default: 100) */
		size: number | Float32Array;
		/** The space the particles occupy (default: 1) */
		scale: number | [number, number, number] | Vector3;
		/** The space the particles occupy (default: 1) */
		noise: number | [number, number, number] | Vector3 | Float32Array;
	};

	export let count: SparklesProperties['count'] = 100;
	export let speed: SparklesProperties['speed'] = 1;
	export let opacity: SparklesProperties['opacity'] = 1;
	export let color: SparklesProperties['color'] = new Color(0xffffff);
	export let size: SparklesProperties['size'] = Math.random();
	export let scale: SparklesProperties['scale'] = 1;
	export let noise: SparklesProperties['noise'] = 1;
	export let position: SparklesProperties['position'] = [0, 0, 0];

	const isVector = (v: any): v is Vector2 | Vector3 | Vector4 =>
		v instanceof Vector2 || v instanceof Vector3 || v instanceof Vector4;

	const isFloat32Array = (def: any): def is Float32Array =>
		def && (def as Float32Array).constructor === Float32Array;

	const normalizeVector = (v: any): number[] => {
		if (Array.isArray(v)) return v;
		else if (isVector(v)) return v.toArray();
		return [v, v, v] as number[];
	};

	const expandColor = (v: Color) => [v.r, v.g, v.b];

	const positions = Float32Array.from(
		Array.from({ length: count }, () => normalizeVector(scale).map(randFloatSpread)).flat()
	);

	const usePropAsIsOrAsAttribute = <T extends any>(
		count: number,
		prop?: T | Float32Array,
		setDefault?: (v: T) => number
	) => {
		if (prop !== undefined) {
			if (isFloat32Array(prop)) {
				return prop as Float32Array;
			} else {
				if (prop instanceof Color) {
					const a = Array.from({ length: count * 3 }, () => expandColor(prop)).flat();
					return Float32Array.from(a);
				} else if (isVector(prop) || Array.isArray(prop)) {
					const a = Array.from({ length: count * 3 }, () => normalizeVector(prop)).flat();
					return Float32Array.from(a);
				}

				return Float32Array.from({ length: count }, () => prop as unknown as number);
			}
		}
		return Float32Array.from({ length: count }, setDefault!);
	};

	let opacities = usePropAsIsOrAsAttribute<number>(count, opacity);
	let sizes = usePropAsIsOrAsAttribute<number>(count, size, Math.random);
	let speeds = usePropAsIsOrAsAttribute<number>(count, speed);
	let noises = usePropAsIsOrAsAttribute<typeof noise>(count * 3, noise);
	let colors = usePropAsIsOrAsAttribute<ColorRepresentation>(
		color === undefined ? count * 3 : count,
		!isFloat32Array(color) ? new Color(color) : color,
		() => 1
	);

	const material = new ShaderMaterial({
		uniforms: SparkleShader.uniforms,
		vertexShader: SparkleShader.vertextShader,
		fragmentShader: SparkleShader.fragmentShader,
		transparent: true,
		depthWrite: false
	});

	const geometry = new BufferGeometry();

	geometry.setAttribute('position', new BufferAttribute(positions, 3));
	geometry.setAttribute('size', new BufferAttribute(sizes, 1));
	geometry.setAttribute('opacity', new BufferAttribute(opacities, 1));
	geometry.setAttribute('speed', new BufferAttribute(speeds, 1));
	geometry.setAttribute('color', new BufferAttribute(colors, 3));
	geometry.setAttribute('noise', new BufferAttribute(noises, 3));

	useFrame((ctx, deltaTime) => {
		if (material) material.uniforms.time.value += deltaTime * 0.2;
	});
</script>

<T.Points {material} {geometry} {position} />
