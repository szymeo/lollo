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
	const DURATION = 800;
</script>

<div
	in:fly|global={{
		y: 5,
		delay: order * DURATION * 0.3,
		duration: DURATION,
		easing: circInOut,
	}}
	class={[
		'flex h-12 w-12 flex-col items-center justify-center rounded-lg text-xs font-semibold capitalize sm:h-20 sm:w-20 sm:rounded-xl sm:p-2 sm:text-base',
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
