import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (/* { request } */) => {
	// todo: use it for ladderboard/live stats
	return json({ status: 'ok' });
};
