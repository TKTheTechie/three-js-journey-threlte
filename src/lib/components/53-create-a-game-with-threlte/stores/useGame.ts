import { writable, readable } from 'svelte/store';

export enum PHASE {
	Ready = 'ready',
	Playing = 'playing',
	Finished = 'finished',
	Ended = 'ended'
}

export const blocksCount = writable(3);

export const gamePhase = writable(PHASE.Ready);

export const startTime = writable(0);

export const endTime = writable(0);
