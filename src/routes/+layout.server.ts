import type { ChampionGuessingGameState, LolChampion } from '$lib';
import { riotAPI } from '$lib/shared/api/riot/lol/riot-games-lol.api';

export async function load(): Promise<{
	champions: Map<LolChampion['id'], LolChampion>;
	game: ChampionGuessingGameState;
}> {
	const champions = await riotAPI.getChampionList();
	const game = {
		champion: champions[Math.floor(Math.random() * champions.length)].id,
		tries: 0,
		guesses: [],
		is_daily: false,
	};

	return {
		champions: new Map(
			champions.map((champion) => [champion.id, champion]),
		),
		game,
	};
}
