import type { LolChampion } from './LolChampion';

export type ChampionGuessingGameState = {
	id: string;
	champion: LolChampion['id'];
	tries: number;
	is_daily: boolean;
};
