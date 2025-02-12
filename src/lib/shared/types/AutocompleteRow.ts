import type { LolChampion } from './LolChampion';

export type AutocompleteRow = {
	id: LolChampion['id'];
	name: string;
	image: string;
};
