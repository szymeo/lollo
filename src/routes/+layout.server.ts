import type { ChampionGuessingGameState, LolChampion } from '$lib';
import { riotAPI } from '$lib/shared/api/riot/lol/riot-games-lol.api';

// todo: use response streaming here
export async function load(): Promise<{
	champions: Map<LolChampion['id'], LolChampion>;
	game: ChampionGuessingGameState;
}> {
	const championsPromise = riotAPI
		.getChampionList()
		.then(
			(champions) =>
				new Map(champions.map((champion) => [champion.id, champion])),
		);
	const date = new Date();
	const dayOfYear = getDayOfYear(date);
	const currentYear = date.getFullYear();
	const gamePromise = championsPromise.then((championsMap) => {
		const championIds = Array.from(championsMap.keys());
		const championId = championIds[dayOfYear % championIds.length];

		return {
			id: `daily-${championId}-${dayOfYear}-${currentYear}`,
			champion: championId,
			tries: 0,
			is_daily: true,
		};
	});

	return {
		champions: await championsPromise,
		// todo: calculate game on the client side and send only stats from the server
		game: await gamePromise,
	};
}

function getDayOfYear(date: Date): number {
	const start = new Date(date.getFullYear(), 0, 0);
	const diff = date.getTime() - start.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	return Math.floor(diff / oneDay);
}
