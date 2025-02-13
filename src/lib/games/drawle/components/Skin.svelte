<script lang="ts">
	const { color, eyes, mouth } = $props();
</script>

<div
	class={[
		'pointer-events-none flex aspect-square w-12 flex-col items-center justify-center rounded-full text-2xl leading-3 font-black whitespace-nowrap text-black select-none',
		color,
	]}
>
	<span class="block">{eyes} {eyes}</span>

	<span class="mb-2 block">
		{mouth}
	</span>
</div>
