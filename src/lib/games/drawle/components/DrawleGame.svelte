<script lang="ts">
	import DrawCanvas from './DrawCanvas.svelte';
	import PlayerHub from './PlayerHub.svelte';

	type Props = {
		roomId?: string;
	};
	const { roomId }: Props = $props();
	let isPlaying = $state(false);
</script>

{#if !isPlaying}
	<PlayerHub
		{roomId}
		onCreate={() => (isPlaying = true)}
		onJoin={() => (isPlaying = true)}
	/>
{:else}
	<div class="flex h-full w-full flex-col items-center justify-center">
		<DrawCanvas artistId={0} isDrawing={true} onDraw={console.log} />
	</div>
{/if}

<!-- <DrawCanvas artistId={0} isDrawing={true} onDraw={console.log} /> -->
