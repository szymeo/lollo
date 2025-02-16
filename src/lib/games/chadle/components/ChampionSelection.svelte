<script lang="ts">
	import type { AutocompleteRow, LolChampion } from '$lib';
	import { fly } from 'svelte/transition';

	type Props = {
		autocomplete: AutocompleteRow[];
		onSelect: (id: LolChampion['id']) => void;
	};
	const { autocomplete, onSelect }: Props = $props();
	const MAX_RESULTS = 5;

	let search = $state('');
	let currentSearch = $state('');
	let activeIndex = $state(0);

	const filtered_autocomplete = $derived.by(() =>
		autocomplete
			.filter((r) =>
				r.name.toLowerCase().startsWith(search.toLowerCase()),
			)
			.slice(0, MAX_RESULTS),
	);

	$effect(() => {
		currentSearch = search;
		activeIndex = 0;
	});

	function onKeyDown(event: KeyboardEvent) {
		if (filtered_autocomplete.length === 0) {
			return;
		}

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				activeIndex = (activeIndex + 1) % filtered_autocomplete.length;
				break;
			case 'ArrowUp':
				event.preventDefault();
				activeIndex =
					(activeIndex - 1 + filtered_autocomplete.length) %
					filtered_autocomplete.length;
				break;
			case 'Enter':
				event.preventDefault();
				if (
					activeIndex >= 0 &&
					activeIndex < filtered_autocomplete.length
				) {
					onSelect(filtered_autocomplete[activeIndex].id);
					search = '';
				}
				break;
			case 'Escape':
				event.preventDefault();
				search = '';
				break;
		}
	}
</script>

<div class="z-20 w-full px-4 sm:w-1/3 sm:min-w-96 sm:px-0">
	<div class="relative">
		<input
			class={[
				'isolate w-full rounded-3xl border-t border-gray-100/10 bg-gray-900 px-6 py-3 font-sans text-xl',
				{
					'rounded-b-none':
						search.length > 0 && filtered_autocomplete.length > 0,
				},
			]}
			type="text"
			bind:value={search}
			placeholder="Guess a champion..."
			autofocus
			onkeydown={onKeyDown}
		/>

		{#if search.length > 0 && filtered_autocomplete.length > 0}
			<ul
				class="absolute top-full flex w-full flex-col gap-3 rounded-b-3xl bg-gray-900 px-3 pt-2 pb-3 sm:px-5 sm:pb-5"
			>
				{#each filtered_autocomplete as { id, name, image }, index}
					<li
						in:fly|global={{
							y: 5,
							duration: 350,
							delay: index * 25,
						}}
						class={[
							'flex cursor-pointer items-center gap-5 rounded-full border border-transparent pr-2 font-sans text-lg',
							{
								'bg-gray-800/50': index === activeIndex,
							},
						]}
						onclick={() => {
							onSelect(id);
							search = '';
						}}
						onmouseover={() => {
							activeIndex = index;
						}}
						onmouseout={() => {
							activeIndex = 0;
						}}
					>
						<img
							class={[
								'h-10 w-10 shrink-0 rounded-full ring-1 transition-colors group-hover:ring-amber-400',
								{
									'ring-amber-400': index === activeIndex,
									'ring-gray-600': index !== activeIndex,
								},
							]}
							src={currentSearch === search ? image : ''}
							alt={name}
							loading="eager"
						/>

						<span
							class={[
								'block w-full flex-1 group-hover:text-amber-400',
								{
									'text-gray-400': index !== activeIndex,
									'text-amber-400': index === activeIndex,
								},
							]}
						>
							{name}
						</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
