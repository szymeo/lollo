<script lang="ts">
	import ArrowUpIcon from '$lib/shared/icons/ArrowUpIcon.svelte';
	import { type LolChampion } from '$lib/shared/types/LolChampion';
	import GuessTile from './GuessTile.svelte';
	import {
		get_array_tile_status,
		get_primitive_tile_status,
	} from './guess-tile.helpers';

	type Props = {
		winning_guess: LolChampion['id'];
		guesses: LolChampion['id'][];
		champions: Map<LolChampion['id'], LolChampion>;
	};

	const { winning_guess, guesses, champions }: Props = $props();
	const target_champion = champions.get(winning_guess);

	const tiles: {
		key: string;
		status_getter: (...argv: any[]) => 'green' | 'orange' | 'red';
		modifier: (v: any) => any;
	}[] = [
		{
			key: 'gender',
			status_getter: get_primitive_tile_status,
			modifier: (v) => v,
		},
		{
			key: 'roles',
			status_getter: get_array_tile_status,
			modifier: (v) => v.join(', '),
		},
		{
			key: 'ranged',
			status_getter: get_primitive_tile_status,
			modifier: (v) => (v ? 'Ranged' : 'Melee'),
		},
		{
			key: 'resource_type',
			status_getter: get_primitive_tile_status,
			modifier: (v) => v,
		},
		{
			key: 'regions',
			status_getter: get_array_tile_status,
			modifier: (v) => v.join(', '),
		},
	];
</script>

<div class="scrollable h-full w-full flex-1 overflow-auto">
	<div
		class="sticky top-0 h-2 bg-gradient-to-b from-gray-950 to-transparent sm:h-14"
	></div>

	<div class="mx-auto flex w-fit max-w-2xl flex-col-reverse gap-1 sm:gap-2">
		{#each guesses as guess}
			{@const champion = champions.get(guess)!}

			<div class="flex w-fit gap-1 text-center sm:gap-2">
				<div
					class="m-auto flex h-10 w-10 shrink-0 items-center justify-center sm:h-20 sm:w-20"
				>
					<img
						class="h-10 w-10 shrink-0 rounded-lg sm:h-14 sm:w-14"
						src={champion?.avatar}
						alt={champion?.name}
					/>
				</div>

				{#each tiles as { key, status_getter, modifier }, i}
					<GuessTile
						order={i}
						status={status_getter(
							(champion as any)[key],
							(target_champion as any)[key],
						)}
					>
						{modifier((champion as any)[key])}
					</GuessTile>
				{/each}

				<GuessTile
					order={tiles.length}
					status={get_primitive_tile_status(
						champion.year_released,
						target_champion?.year_released,
					)}
				>
					{#if champion?.year_released > target_champion!.year_released}
						{champion?.year_released.toString()}
						<ArrowUpIcon
							class="h-4 w-4 rotate-180"
							fill="fill-red-600"
						/>
					{:else if champion?.year_released < target_champion!.year_released}
						<ArrowUpIcon class="h-4 w-4" fill="fill-red-600" />
						{champion?.year_released.toString()}
					{:else}
						{champion?.year_released.toString()}
					{/if}
				</GuessTile>
			</div>
		{/each}

		{#if guesses.length > 0}
			<div
				class="sticky top-0 flex w-fit items-center gap-1 py-1 text-center text-xs leading-tight text-white capitalize sm:gap-2 sm:py-2 sm:text-base"
			>
				<span class="block w-10 sm:w-20"></span>
				{#each tiles as { key }, i}
					<span class="block w-12 sm:w-20">
						{key.replaceAll('_', ' ')}
					</span>
				{/each}
				<span class="block w-12 sm:w-20">Release Year</span>
			</div>
		{/if}
	</div>
	<div
		class="sticky bottom-0 h-2 bg-gradient-to-t from-gray-950 to-transparent sm:h-14"
	></div>
</div>
