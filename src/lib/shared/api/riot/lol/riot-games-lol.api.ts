import type { LolChampion } from '$lib';
import type { RiotChampion as RawLolChampion } from './raw-types';
import { champions_release_years } from './champions_release_years';
import { get_gender_from, get_region_from } from './data.helpers';

class RiotAPI {
	private static readonly BASE_URL = 'https://ddragon.leagueoflegends.com';
	private static instance: RiotAPI;

	private constructor() {
		// Initialization code
	}

	public static getInstance(): RiotAPI {
		if (!RiotAPI.instance) {
			RiotAPI.instance = new RiotAPI();
		}

		return RiotAPI.instance;
	}

	public async getChampionList(): Promise<LolChampion[]> {
		const version = await this.getLatestVersion();
		const response = await fetch(
			`${RiotAPI.BASE_URL}/cdn/${version}/data/en_US/champion.json`,
		);
		type Response = { data: Record<string, RawLolChampion> };
		const data: Response = await response.json();

		return Object.values(data.data).map((c) => ({
			id: +c.key,
			avatar: `${RiotAPI.BASE_URL}/cdn/${version}/img/champion/${c.image.full}`,
			name: c.name,
			gender: get_gender_from(c.blurb.toLowerCase()),
			ranged: c.stats.attackrange > 300,
			positions: [],
			regions: [get_region_from(c.blurb)],
			species: '',
			resource_type: c.partype || 'None',
			year_released: champions_release_years[c.id] || 0,
			roles: c.tags,
		}));
	}

	// public async getChampionDetails(championId: string): Promise<RiotChampion> {

	// }

	private async getLatestVersion(): Promise<string> {
		const response = await fetch(`${RiotAPI.BASE_URL}/api/versions.json`);
		const [latest]: string = await response.json();
		return latest;
	}
}

/*
 async function getLatestVersion(): Promise<string> {
	const versionsUrl = 'https://ddragon.leagueoflegends.com/api/versions.json';
	const response = await fetch(versionsUrl);
	const versions: string[] = await response.json();
	return versions[0]; // Latest version is first in the array
}

async function fetchChampionList(version: string): Promise<RiotChampion[]> {
	const championDataUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
	const response = await fetch(championDataUrl);
	const data: { data: Record<string, RiotChampion> } = await response.json();
	return Object.values(data.data); // Return an array of champions
}

// Step 4: Fetch detailed data for a specific champion
async function fetchChampionDetails(
	version: string,
	championId: string,
): Promise<TransformedChampion> {
	const championDetailsUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championId}.json`;
	const response = await fetch(championDetailsUrl);
	const data: RiotChampionDetails = await response.json();

	const champion = data.data[championId];

	return {
		name: championId,
		gender: champion.tags.includes('Fighter') ? 'Male' : 'Female', // Example mapping
		positions: champion.tags,
		species: champion.partype, // Example mapping
		resource: champion.partype,
		rangeType: champion.stats.attackrange > 300 ? 'Ranged' : 'Melee',
		releaseYear: new Date(champion.version).getFullYear(),
		regions: [champion.blurb.split(' ')[0]], // Simplified example
		abilities: {
			passive: {
				name: champion.passive.name,
				description: champion.passive.description,
			},
			q: {
				name: champion.spells[0].name,
				description: champion.spells[0].description,
			},
			w: {
				name: champion.spells[1].name,
				description: champion.spells[1].description,
			},
			e: {
				name: champion.spells[2].name,
				description: champion.spells[2].description,
			},
			r: {
				name: champion.spells[3].name,
				description: champion.spells[3].description,
			},
		},
	};
}

// Step 5: Select a random daily champion
function selectDailyChampion(champions: RiotChampion[]): string {
	const randomIndex = Math.floor(Math.random() * champions.length);
	return champions[randomIndex].id; // Return the champion ID
}
 
*/

export const riotAPI = RiotAPI.getInstance();
