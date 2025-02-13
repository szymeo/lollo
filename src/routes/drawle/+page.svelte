<script lang="ts">
	import {
		ChampionGuessingGame,
		type ChampionGuessingGameState,
		type LolChampion,
	} from '$lib';
	import DrawleGame from '$lib/games/drawle/components/DrawleGame.svelte';

	type Props = {
		data: {
			champions: Map<LolChampion['id'], LolChampion>;
			game: ChampionGuessingGameState;
		};
	};
	const { data }: Props = $props();
	const isDev = import.meta.env.MODE === 'development';
</script>

<svelte:head>
	<title>Drawle | Lollo</title>
	<meta
		name="description"
		content="Your League of Legends after hours gamer hub"
	/>
</svelte:head>

{#if isDev}
	<DrawleGame />
{:else}
	<p>Drawle is currently under development. Please check back later.</p>
{/if}
