<script lang="ts">
	import CrownIcon from '$lib/shared/icons/CrownIcon.svelte';
	import { page } from '$app/state';
	import '../app.css';
	import GithubIcon from '$lib/shared/icons/GithubIcon.svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};
	let { children }: Props = $props();

	const ROUTES = [
		{ name: 'Chadle', href: '/' },
		{ name: 'Drawle', href: '/drawle' },
		// { name: 'Skilldle', href: '/skilldle' },
		// { name: '1v1', href: '/1v1' },
	];
</script>

<div
	class="scrollable flex h-dvh flex-col overflow-auto border-t-4 border-amber-400"
>
	<nav
		class="sticky top-0 z-10 flex w-full items-center justify-between px-6"
	>
		<h1
			class="relative flex w-fit items-center justify-center gap-2 py-4 text-3xl font-extrabold"
		>
			<CrownIcon
				class="h-8 w-8"
				fill="fill-amber-400"
				stroke="stroke-amber-400"
			/>
			Lollo

			<span
				class="absolute top-3 left-full -ml-2.5 text-xs font-semibold text-amber-400"
			>
				alpha
			</span>
		</h1>

		<div class="flex gap-6 font-semibold">
			{#each ROUTES as { name, href }, i}
				<a
					{href}
					class={[
						'font-semibold',
						{
							'text-amber-400': page.url.pathname === href,
							'text-gray-300 hover:text-white':
								page.url.pathname !== href,
						},
					]}
				>
					{name}
				</a>
			{/each}

			<a
				href="https://github.com/szymeo/lollo"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-300 hover:text-white"
			>
				<GithubIcon class="h-6 w-6" fill="fill-gray-300" />
			</a>
		</div>
	</nav>

	<main class="flex-1 overflow-auto">
		{@render children()}
	</main>

	<footer class="">
		<p class="p-4 text-center text-[9px] tracking-normal text-gray-400">
			Lollo is not endorsed by Riot Games and does not reflect the views
			or opinions of Riot Games or anyone officially involved in producing
			or managing Riot Games properties. Riot Games and all associated
			properties are trademarks or registered trademarks of Riot Games,
			Inc.
		</p>
	</footer>
</div>
