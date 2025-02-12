enum Position {
	TOP = 'Top',
	JUNGLE = 'Jungle',
	MIDDLE = 'Middle',
	BOTTOM = 'Bottom',
	SUPPORT = 'Support',
}

export type LolChampion = {
	id: number;
	name: string;
	avatar: string;
	gender: string;
	positions: Position[];
	regions: string[];
	year_released: number;
	roles: string[];
	ranged: boolean;
	resource_type: string;
};
