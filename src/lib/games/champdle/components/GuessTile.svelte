<script lang="ts">
	import type { Snippet } from 'svelte';
	import { circInOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	type Props = {
		status?: 'green' | 'orange' | 'red';
		children: Snippet;
		order: number;
		class?: string;
	};
	const {
		status,
		children,
		order = 0,
		class: class_name = '',
	}: Props = $props();
	const DURATION = 1100;
</script>

<div
	in:fly|global={{
		y: 5,
		delay: order * DURATION * 0.4,
		duration: DURATION,
		easing: circInOut,
	}}
	class={[
		'flex h-20 w-20 flex-col items-center justify-center rounded-xl p-2 font-semibold capitalize hover:opacity-100',
		{
			'bg-green-500/35 text-green-500': status === 'green',
			'bg-red-500/25 text-red-600': status === 'red',
			'bg-amber-400/35 text-amber-400': status === 'orange',
		},
		class_name,
	]}
>
	{@render children()}
</div>
