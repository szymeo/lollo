export const get_gender_from = (text: string): string => {
	const female_gender_keywords = ['she', 'her', 'hers'];
	const male_gender_keywords = ['he', 'him', 'his'];

	if (
		female_gender_keywords.some((keyword) => text.includes(` ${keyword} `))
	) {
		return 'female';
	}

	if (male_gender_keywords.some((keyword) => text.includes(` ${keyword} `))) {
		return 'male';
	}

	return 'unknown';
};

export const get_region_from = (text: string): string => {
	const region_keywords: Record<string, string[]> = {
		Demacia: ['demacia', 'demacian'],
		Noxus: ['noxus', 'noxian'],
		Ionia: ['ionia', 'ionian'],
		Freljord: ['freljord', 'freljordian'],
		Piltover: ['piltover', 'piltovan'],
		Zaun: ['zaun', 'zaunite'],
		'Shadow Isles': ['shadow isles', 'shadow isles'],
		Shurima: ['shurima', 'shuriman'],
		Bilgewater: ['bilgewater', 'bilgewater'],
		Targon: ['targon', 'targonian'],
		Void: ['void', 'voidborn'],
		'Bandle City': ['bandle city', 'yordle'],
		Ixtal: ['ixtal', 'ixtali'],
		Runeterra: ['runeterra'],
	};
	const searchable = text.toLowerCase();

	for (let i = 0; i < Object.keys(region_keywords).length; i++) {
		const key = Object.keys(region_keywords)[i];
		for (let j = 0; j < Object.values(region_keywords[key]).length; j++) {
			const keyword = Object.values(region_keywords[key])[j];
			if (searchable.includes(keyword)) {
				return keyword;
			}
		}
	}

	return 'Unknown';
};
