// const version = await getLatestVersion();
// const champions = await fetchChampionList(version);

// // Step 6.1: Select a random daily champion
// const dailyChampionId = selectDailyChampion(champions);
// console.log('Daily Champion ID:', dailyChampionId);

// // Step 6.2: Fetch detailed data for the daily champion
// const dailyChampion = await fetchChampionDetails(version, dailyChampionId);
// console.log('Daily Champion Details:', dailyChampion);

// // Step 6.3: Fetch data for a user-guessed champion (example)
// const guessedChampionId = 'Ahri'; // Replace with user input
// const guessedChampion = await fetchChampionDetails(version, guessedChampionId);
// console.log('Guessed Champion Details:', guessedChampion);

import { json, type RequestHandler } from '@sveltejs/kit';

// export const GET: RequestHandler = async () => {
// 	return Promise.all(
// 		files.map(async (file) => {
// 			return {
// 				title: file.name,
// 				src: await supabase.storage
// 					.from('videos')
// 					.getPublicUrl(file.name).data.publicUrl,
// 			};
// 		}),
// 	).then((data) => json(data));
// };

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	console.log(body);

	return json({ status: 'k' });
};
