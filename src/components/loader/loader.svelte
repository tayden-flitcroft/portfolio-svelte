<style global lang="scss">
	.four-dots {
		&:before {
			box-shadow: 20px 0 0 5px var(--main), 0 20px 0 5px var(--complementary),
				0 (20px * -1) 0 5px var(--complementary), -(20px) 0 0 5px var(--main);
		}
	}
</style>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	onMount(() => {
		document.body.classList.add('cursor-progress')
	})

	onDestroy(() => {
		document.body.classList.remove('cursor-progress')
	})
</script>

<div class="">
	<div
		class="absolute bottom-0 left-0 right-0 top-0 z-[9998] bg-gray-400 opacity-50 transition-opacity duration-1000 ease-in-out"
	/>
	<div
		class="four-dots before:content=[''] fixed left-1/2 top-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2 before:block before:h-[5px] before:w-[5px] before:animate-spin before:rounded-full"
	/>
</div>
