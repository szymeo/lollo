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
			<div
				class="z-10 bg-black py-2 text-center font-bold text-amber-400"
			>
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

		{#if has_won_already}
			<div
				class="z-10 bg-black py-2 text-center font-bold text-amber-400"
			>
				You've won today's daily challenge!
			</div>
		{/if}

		<GuessesList {guesses} winning_guess={game.champion} {champions} />
	</section>
{/if}
