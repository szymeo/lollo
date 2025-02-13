export const get_array_tile_status = (
	base_array?: unknown[],
	target_array?: unknown[],
): 'green' | 'orange' | 'red' => {
	if (!base_array || !target_array) {
		return 'red';
	}

	if (base_array.length === 0) {
		return 'red';
	}

	if (base_array.length === target_array.length) {
		if (base_array.every((value) => target_array.includes(value))) {
			return 'green';
		}
	}

	if (base_array.some((value) => target_array.includes(value))) {
		return 'orange';
	}

	return 'red';
};

export const get_primitive_tile_status = (
	a: unknown,
	b: unknown,
): 'green' | 'orange' | 'red' => {
	if (a === b) {
		return 'green';
	}

	if (!a || !b || a !== b) {
		return 'red';
	}

	return 'red';
};
