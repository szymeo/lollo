import type { ChampionGuessingGameState, LolChampion } from '$lib';
import { riotAPI } from '$lib/shared/api/riot/lol/riot-games-lol.api';

export async function load(): Promise<{
	champions: Map<LolChampion['id'], LolChampion>;
	game: ChampionGuessingGameState;
}> {
	const champions = await riotAPI.getChampionList();
	const championsMap = new Map(
		champions.map((champion) => [champion.id, champion]),
	);
	const dayOfYear = getDayOfYear(new Date());
	const championIds = Array.from(championsMap.keys());
	const championId = championIds[dayOfYear % championIds.length];
	const currentYear = new Date().getFullYear();

	const game = {
		id: `daily-${championId}-${dayOfYear}-${currentYear}`,
		champion: championId,
		// todo: get tries from database
		tries: 0,
		is_daily: true,
	};

	return {
		champions: championsMap,
		game,
	};
}

function getDayOfYear(date: Date): number {
	const start = new Date(date.getFullYear(), 0, 0);
	const diff = date.getTime() - start.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	return Math.floor(diff / oneDay);
}
