<script lang="ts">
	import type { ChampionGuessingGameState } from '$lib/shared/types/ChampionGuessingGameState';
	import { type LolChampion } from '$lib/shared/types/LolChampion';
	import { onMount } from 'svelte';
	import ChampionSelection from './ChampionSelection.svelte';
	import GuessesList from './GuessesList.svelte';

	type Props = {
		game: ChampionGuessingGameState;
		champions: Map<LolChampion['id'], LolChampion>;
	};
	const { game, champions }: Props = $props();
	let guesses = $state<LolChampion['id'][]>([]);
	let mounted = $state(false);
	const clues = $derived([
		{
			guesses_threshold: 8,
			clue: `First letter of the champion's name is ${champions.get(game.champion).name.charAt(0)}`,
		},
		{
			guesses_threshold: 12,
			clue: `Champion is ${champions.get(game.champion).ranged ? 'ranged' : 'melee'}`,
		},
		{
			guesses_threshold: 16,
			clue: `Champion is from ${champions.get(game.champion).regions.join(', ')}`,
		},
		{
			guesses_threshold: 20,
			clue: `Champion's resource type is ${champions.get(game.champion).resource_type}`,
		},
	]);

	const loadGuesses = () => {
		const savedGuesses = localStorage.getItem(`guesses-${game.id}`);
		if (savedGuesses) {
			guesses = JSON.parse(savedGuesses);
		}
	};

	const saveGuesses = () => {
		localStorage.setItem(`guesses-${game.id}`, JSON.stringify(guesses));
	};

	const onChampionSelected = (id: LolChampion['id']) => {
		if (has_won_already) {
			return;
		}
		guesses.push(id);
		saveGuesses();
	};

	const has_won_already = $derived(guesses.includes(game.champion));

	onMount(() => {
		mounted = true;
		loadGuesses();
	});
</script>

{#if mounted}
	<section
		class="flex h-full w-full flex-col items-center justify-start overflow-auto"
	>
		{#if guesses.length === 0}
			<div class="z-10 py-2 text-center font-bold text-amber-400">
				Who's today's daily challenge champion?
			</div>
		{/if}

		<ChampionSelection
			onSelect={(id: LolChampion['id']) => {
				onChampionSelected(id);
			}}
			autocomplete={[...champions.values()]
				.map((champion) => ({
					id: champion.id,
					name: champion.name,
					image: champion.avatar,
				}))
				.filter((champion) => !guesses.includes(champion.id))}
		/>

		<div class="z-10 py-2 text-center"></div>
		{#if has_won_already}
			<div class="font-bold text-amber-400">
				You've won today's daily challenge!
			</div>
		{:else}
			{@const guesses_left =
				(clues.find((clue) => guesses.length < clue.guesses_threshold)
					?.guesses_threshold || 0) - guesses.length}
			{#if clues.some((clue) => guesses.length >= clue.guesses_threshold)}
				<div class="font-bold text-amber-400">
					{#each clues.filter((clue) => guesses.length >= clue.guesses_threshold) as clue}
						<p class="text-center">{clue.clue}</p>
					{/each}
				</div>
			{/if}

			{#if guesses.length > 0 && guesses_left > 0}
				<span class="text-xs uppercase">
					Next clue in {guesses_left} guesses.
				</span>
			{/if}
		{/if}

		<GuessesList {guesses} winning_guess={game.champion} {champions} />
	</section>
{/if}
