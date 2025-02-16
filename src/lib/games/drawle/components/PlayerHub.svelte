<script lang="ts">
	import ArrowUpIcon from '$lib/shared/icons/ArrowUpIcon.svelte';
	import { onMount } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';
	import { fly } from 'svelte/transition';
	import Skin from './Skin.svelte';

	const { roomId, onCreate, onJoin } = $props();

	const options = {
		color: [
			'bg-amber-400',
			'bg-sky-500',
			'bg-indigo-500',
			'bg-green-500',
			'bg-gray-100',
		],
		eyes: ['❤️', '👁️', '👁️‍🗨️', '💲', '.', 'p', 'd', 'b'],
		mouth: ['_', '.', 'o', '-', '=', 'x', 'v', 'u'],
	};

	let mounted = $state(false);
	let nickname = $state('');
	let skin = $state({
		color: options.color[0],
		eyes: options.eyes[0],
		mouth: options.mouth[1],
	});

	function changeSkinOption(
		option: keyof typeof options,
		direction: 1 | -1,
	): void {
		const currentIndex = options[option].indexOf(skin[option]);
		const newIndex =
			(currentIndex + direction + options[option].length) %
			options[option].length;
		skin[option] = options[option][newIndex];
		saveSkinSettings();
	}

	const saveSkinSettings = () => {
		localStorage.setItem('skin', JSON.stringify(skin));
	};

	const saveNickname = () => {
		localStorage.setItem('nickname', nickname);
	};

	const loadSkinSettings = () => {
		const savedSkin = localStorage.getItem('skin');
		if (savedSkin) {
			skin = JSON.parse(savedSkin);
		}
	};

	const loadNickname = () => {
		const savedNickname = localStorage.getItem('nickname');
		if (savedNickname) {
			nickname = savedNickname;
		}
	};

	onMount(() => {
		loadSkinSettings();
		loadNickname();
		mounted = true;
	});

	function startGame() {
		console.log('Game started with nickname:', nickname, 'and skin:', skin);
	}
</script>

{#snippet arrow_button_left(onclick: MouseEventHandler<HTMLButtonElement>)}
	<button type="button" role="button" class="cursor-pointer" {onclick}>
		<ArrowUpIcon class="h-4 w-4 -rotate-90" fill="fill-gray-100" />
	</button>
{/snippet}

{#snippet arrow_button_right(onclick: MouseEventHandler<HTMLButtonElement>)}
	<button type="button" role="button" class="cursor-pointer" {onclick}>
		<ArrowUpIcon class="h-4 w-4 rotate-90" fill="fill-gray-100" />
	</button>
{/snippet}

{#if mounted}
	<div
		in:fly={{
			y: 5,
			duration: 100,
		}}
		class="mx-auto w-full max-w-md shrink-0 space-y-4 rounded-lg border-gray-700 p-6 sm:border"
	>
		<div class="flex items-center justify-center">
			<div class="flex h-full flex-col gap-3">
				{@render arrow_button_left(() => changeSkinOption('color', -1))}
				{@render arrow_button_left(() => changeSkinOption('eyes', -1))}
				{@render arrow_button_left(() => changeSkinOption('mouth', -1))}
			</div>

			<div class={['flex flex-1 items-center justify-center']}>
				<Skin color={skin.color} eyes={skin.eyes} mouth={skin.mouth} />
			</div>

			<div class="flex h-full flex-col gap-3">
				{@render arrow_button_right(() => changeSkinOption('color', 1))}
				{@render arrow_button_right(() => changeSkinOption('eyes', 1))}
				{@render arrow_button_right(() => changeSkinOption('mouth', 1))}
			</div>
		</div>

		<div class="flex flex-col gap-4">
			<input
				type="text"
				bind:value={nickname}
				oninput={saveNickname}
				class="rounded bg-gray-800 p-1 text-center text-white"
				placeholder="Your nickname"
			/>

			<div class="flex w-full gap-4 text-sm font-bold">
				<button
					class="w-full cursor-pointer rounded bg-gray-100 px-3 py-1 text-black"
					onclick={onCreate}
				>
					Create new game
				</button>

				{#if roomId}
					<button
						onclick={onJoin}
						class="w-full cursor-pointer truncate rounded bg-amber-400 px-3 py-1 text-black"
					>
						Join room {`{${roomId}}`}
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
