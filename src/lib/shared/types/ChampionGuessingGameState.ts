import type { LolChampion } from './LolChampion';

export type ChampionGuessingGameState = {
	champion: LolChampion['id'];
	tries: number;
	guesses: LolChampion['id'][];
	is_daily: boolean;
};
