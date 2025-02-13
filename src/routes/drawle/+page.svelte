<script lang="ts">
	import { page } from '$app/state';
	import {
		ChampionGuessingGame,
		isDev,
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
	const roomId = page.url.searchParams.get('room');
</script>

<svelte:head>
	<title>Drawle | Lollo</title>
	<meta
		name="description"
		content="Your League of Legends after hours gamer hub"
	/>
</svelte:head>

{#if isDev()}
	<DrawleGame {roomId} />
{:else}
	<div class="flex h-full w-full items-center justify-center">
		<p class="px-8 text-center text-amber-400 sm:max-w-96 sm:px-0">
			Drawle is currently under development.
			<br />
			You can check the progress in the
			<a
				class="underline"
				target="_blank"
				href="https://github.com/szymeo/lollo"
			>
				Github repo
			</a>
		</p>
	</div>
{/if}
