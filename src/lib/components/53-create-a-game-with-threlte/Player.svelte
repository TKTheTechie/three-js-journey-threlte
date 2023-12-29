<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { AutoColliders, RigidBody, useRapier } from '@threlte/rapier';
	import { Vector3, type Mesh } from 'three';
	import { useKeyboardControls } from 'svelte-kbc';
	import type { RigidBody as RigidBodyType } from '@dimforge/rapier3d-compat';
	import { PHASE, gamePhase, blocksCount, startTime, endTime } from './stores/useGame';

	const { rapier, world } = useRapier();

	let player: RigidBodyType;

	const { camera } = useThrelte();

	const { w, a, s, d, space } = useKeyboardControls();

	const smoothedCameraPosition = new Vector3(10, 10, 10);
	const smoothedCameraTarget = new Vector3();

	useTask((delta) => {
		const impulse = new Vector3(0, 0, 0);
		const torque = new Vector3(0, 0, 0);

		const impulseStrength = 0.6 * delta;
		const torqueStrength = 0.2 * delta;

		if ($w) {
			impulse.setZ(-1 * (impulse.z - impulseStrength));
			torque.setX(-1 * (torque.x - torqueStrength));
		}
		if ($d) {
			impulse.setX(-1 * (impulse.x + impulseStrength));
			torque.setZ(-1 * (torque.z - torqueStrength));
		}
		if ($s) {
			impulse.setZ(-1 * (impulse.z + impulseStrength));
			torque.setX(-1 * (torque.x + torqueStrength));
		}
		if ($a) {
			impulse.setX(-1 * (impulse.z - impulseStrength));
			torque.setZ(-1 * (torque.z + torqueStrength));
		}
		player.applyImpulse(impulse, true);
		player.applyTorqueImpulse(torque, true);

		/**
		 * Camera
		 */

		const playerPosition = player.translation();
		const cameraPosition = new Vector3();
		cameraPosition.copy(new Vector3(playerPosition.x, 0.65, playerPosition.z - 2.25));

		const cameraTarget = new Vector3();
		cameraTarget.copy(new Vector3(playerPosition.x, 0.25, playerPosition.z));

		smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
		smoothedCameraTarget.lerp(cameraTarget, 5 * delta);

		camera.current.position.copy(smoothedCameraPosition);
		camera.current.lookAt(smoothedCameraTarget);

		if (playerPosition.z > $blocksCount * 4 + 2 && $gamePhase === PHASE.Playing) {
			endTime.set(Date.now());
			gamePhase.set(PHASE.Finished);
		}

		if (playerPosition.y < -4 && $gamePhase === PHASE.Playing) {
			gamePhase.set(PHASE.Ended);
		}
	});

	$: {
		if ($gamePhase === PHASE.Ready && ($w || $a || $s || $d || $space)) {
			console.log('start');
			gamePhase.set(PHASE.Playing);
			startTime.set(Date.now());
		}
		if ($space) {
			const origin = player.translation();
			origin.y -= 0;
			const direction = new Vector3(0, -1, 0);
			const ray = new rapier.Ray(origin, direction);

			const hit = world.castRay(ray, 10, true);

			if (hit && hit.toi < 0.15) {
				console.log(hit.toi);
				player.applyImpulse(new Vector3(0, 0.5, 0), true);
			}
		}
	}

	gamePhase.subscribe((phase) => {
		if (phase === PHASE.Ended) {
			player.setTranslation(new Vector3(0, 1, 0), true);
			player.setLinvel(new Vector3(0, 0, 0), true);
			player.setAngvel(new Vector3(0, 0, 0), true);
			gamePhase.set(PHASE.Ready);
		}
	});
</script>

<RigidBody canSleep={false} bind:rigidBody={player} linearDamping={0.5} angularDamping={0.5}>
	<AutoColliders shape={'ball'} restitution={0.2} friction={1}>
		<T.Mesh castShadow position={[0, 0.4, 0]}>
			<T.IcosahedronGeometry args={[0.3, 1]} />
			<T.MeshStandardMaterial flatShading color="mediumpurple" />
		</T.Mesh>
	</AutoColliders>
</RigidBody>
