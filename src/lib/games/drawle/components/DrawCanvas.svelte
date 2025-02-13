<script lang="ts">
	import { onMount } from 'svelte';
	// import { Eraser, Trash2, Settings2 } from 'lucide-svelte';

	type Props = {
		isDrawing: boolean;
		artistId: number;
		onDraw: (dto: {
			color: string;
			size: string;
			points: { x: number; y: number }[];
		}) => void;
	};
	const { isDrawing, artistId, onDraw }: Props = $props();

	type Point = { x: number; y: number };
	type BrushSettings = {
		size: number;
	};

	let canvas: HTMLCanvasElement | null = null;
	let context: CanvasRenderingContext2D | null = null;
	const BACKGROUND_COLOR = '#030712';

	const points = $state<Point[]>([]);
	let width = $state(0);
	let height = $state(0);

	let isDrawingActive = $state(false);
	let color = $state('#bada55');
	let brushSettings = $state<BrushSettings>({
		size: 5,
	});

	$effect(() => {
		onDraw({
			color,
			size: brushSettings.size.toString(),
			points,
		});
	});

	onMount(() => {
		console.log('onmount canvas:', canvas);
		const dpr = window.devicePixelRatio || 1;
		const ctx = canvas.getContext('2d', { willReadFrequently: true });
		if (!ctx) {
			console.log('no context');

			return null;
		}

		ctx.scale(dpr, dpr);
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.imageSmoothingEnabled = false;
		ctx.imageSmoothingQuality = 'high';
		ctx.strokeStyle = 'pink';
		ctx.lineWidth = 50;

		ctx.fillStyle = BACKGROUND_COLOR;
		ctx.strokeStyle = color;
		ctx.lineWidth = brushSettings.size;
		ctx.fillRect(0, 0, width, height);

		context = ctx;
		return () => {
			context = null;
			// if (animationFrame) {
			// 	cancelAnimationFrame(animationFrame);
			// }
		};
	});

	const getPoint = (e: MouseEvent): Point => {
		const rect = canvas.getBoundingClientRect();
		return {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};
	};

	const drawPoints = () => {
		if (!context || points.length < 2) {
			return;
		}

		context.beginPath();
		context.moveTo(points[0].x, points[0].y);

		for (let i = 1; i < points.length - 2; i++) {
			const xc = (points[i].x + points[i + 1].x) / 2;
			const yc = (points[i].y + points[i + 1].y) / 2;
			context.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
		}

		context.stroke();
	};

	$effect(() => {
		if (!isDrawingActive) {
			return;
		}

		let animationFrame: number;

		const animate = () => {
			if (isDrawingActive) {
				drawPoints();
			}

			animationFrame = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	});

	const startDrawing = (e: MouseEvent) => {
		if (!isDrawing || artistId !== 0) {
			console.log('startDrawing: not drawing or not artist');

			return;
		}

		context.lineCap = 'round';
		context.lineJoin = 'round';
		context.imageSmoothingEnabled = true;
		context.imageSmoothingQuality = 'high';
		context.strokeStyle = color;
		context.lineWidth = brushSettings.size;

		const point = getPoint(e);

		points.length = 0;
		points.push(point);
		isDrawingActive = true;
	};

	const draw = (e: MouseEvent) => {
		const point = getPoint(e);

		points.push(point);
	};

	const stopDrawing = () => {
		isDrawingActive = false;
		points.length = 0;
		context?.beginPath();
	};

	const clearCanvas = () => {
		if (!context) {
			console.log('clearCanvas: no context');

			return;
		}
		context.fillStyle = BACKGROUND_COLOR;
		context.fillRect(0, 0, width, height);
		context.beginPath();
	};

	const colors = [
		'#FFFFFF',
		'#FF0000',
		'#00FF00',
		'#0000FF',
		'#FFFF00',
		'#FF00FF',
		'#00FFFF',
		'#FFA500',
		'#800080',
	];
</script>

<div class="flex h-full w-full flex-col px-4 py-0.5">
	<div class="mb-4 flex items-center gap-4">
		<div class="flex items-center gap-2">
			{#each colors as c}
				<button
					onclick={() => (color = c)}
					class="h-8 w-8 rounded-full transition-transform"
					class:scale-110={color === c}
					class:ring-2={color === c}
					class:ring-purple-500={color === c}
					style:background-color={c}
				></button>
			{/each}
		</div>

		<div class="h-8 w-px bg-white/20"></div>

		<button
			onclick={() => (color = BACKGROUND_COLOR)}
			class={[
				'flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform',
				{
					'scale-110 ring-2 ring-purple-500':
						color === BACKGROUND_COLOR,
				},
			]}
			title="Eraser"
		>
			Eraser
			<!-- <Eraser class="h-4 w-4" /> -->
		</button>

		<button
			onclick={clearCanvas}
			class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform hover:bg-white/20"
			title="Clear Canvas"
		>
			Clear
			<!-- <Trash2 class="h-4 w-4" /> -->
		</button>
	</div>

	<div
		bind:clientHeight={height}
		bind:clientWidth={width}
		class="relative flex-1 rounded-xl border border-gray-800"
	>
		<canvas
			bind:this={canvas}
			{width}
			{height}
			class="cursor-crosshair rounded-lg"
			onmousedown={startDrawing}
			onmousemove={draw}
			onmouseup={stopDrawing}
			onmouseleave={stopDrawing}
			onmouseout={stopDrawing}
		></canvas>
	</div>
</div>
