<script lang="ts">
	import BlockStart from './BlockStart.svelte';
	import { BoxGeometry, MeshStandardMaterial } from 'three';
	import BlockSpinner from './BlockSpinner.svelte';
	import BlockLimbo from './BlockLimbo.svelte';
	import BlockAxe from './BlockAxe.svelte';
	import BlockEnd from './BlockEnd.svelte';
	import Wall from './Bound.svelte';
	import { PHASE, blocksCount, gamePhase } from './stores/useGame';

	const boxGeometry = new BoxGeometry(1, 1, 1);

	const floor1Material = new MeshStandardMaterial({ color: 'limegreen' });
	const floor2Material = new MeshStandardMaterial({ color: 'greenyellow' });
	const obstacleMaterial = new MeshStandardMaterial({ color: 'orangered' });
	const wallMaterial = new MeshStandardMaterial({ color: 'slategrey' });

	export let count = $blocksCount;

	let blockTypes = [];

	const createLevel = () => {
		blockTypes = [];
		for (let i = 0; i < count; i++) {
			blockTypes.push(Math.floor(Math.random() * 3));
		}
	};

	gamePhase.subscribe((value) => {
		if (value === PHASE.Ready) {
			createLevel();
		}
	});
</script>

<BlockStart position={[0, 0, 0]} material={floor1Material} geometry={boxGeometry} />
{#each blockTypes as blockType, i}
	{#if blockType == 0}
		<BlockSpinner
			position={[0, 0, 4 * (i + 1)]}
			floorMaterial={floor2Material}
			{obstacleMaterial}
			geometry={boxGeometry}
		/>
	{:else if blockType == 1}
		<BlockLimbo
			position={[0, 0, 4 * (i + 1)]}
			floorMaterial={floor2Material}
			{obstacleMaterial}
			geometry={boxGeometry}
		/>
	{:else if blockType == 2}
		<BlockAxe
			position={[0, 0, 4 * (i + 1)]}
			floorMaterial={floor2Material}
			{obstacleMaterial}
			geometry={boxGeometry}
		/>
	{/if}
{/each}
<BlockEnd position={[0, 0, 4 * (count + 1)]} material={floor1Material} geometry={boxGeometry} />

<Wall {count} material={wallMaterial} geometry={boxGeometry} />
