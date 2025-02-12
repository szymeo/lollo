<script lang="ts">
	import {
		ChampionGuessingGame,
		type ChampionGuessingGameState,
		type LolChampion,
	} from '$lib';

	type Props = {
		data: {
			champions: Map<LolChampion['id'], LolChampion>;
			game: ChampionGuessingGameState;
		};
	};
	const { data }: Props = $props();

	$inspect(data);
</script>

<svelte:head>
	<title>Champdle | Lollo</title>
	<meta
		name="description"
		content="Your League of Legends after hours gamer hub"
	/>
</svelte:head>

<ChampionGuessingGame game={data.game} champions={data.champions} />
