<style lang="scss">
	.typed-wrapper {
		font-family: Poppins;
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte'
	import Typed from 'typed.js'
	import 'iconify-icon'
	import { SOCIAL_MEDIA, I_AM_STRINGS } from '../../helpers/constants'
	import { fly, scale, slide } from 'svelte/transition'

	export let sectionData: SectionData
	let shouldAnimate: boolean = false

	let typed: HTMLElement

	const { id } = sectionData

	onMount(() => {
		shouldAnimate = true
	})

	$: if (typed) {
		new Typed(typed, {
			backDelay: 2500,
			backSpeed: 75,
			loop: true,
			smartBackspace: true,
			strings: I_AM_STRINGS,
			typeSpeed: 50
		})
	}
</script>

<section {id} class="flex h-screen flex-col justify-center">
	{#if shouldAnimate}
		<div
			class="flex flex-col justify-center gap-4 sm:items-center sm:text-center"
			transition:slide={{ delay: 150, duration: 900 }}
		>
			<h1 class="text-6xl sm:text-4xl">Tayden Flitcroft</h1>
			<div class="typed-wrapper text-2xl">
				I'm a <span class="text-[$main]" bind:this={typed} />
			</div>

			<ul class="mt-5 flex gap-6">
				{#each SOCIAL_MEDIA as item}
					{@const { icon, href, title } = item}
					<li>
						<a rel="noreferrer" {href} target="_blank">
							<iconify-icon
								{icon}
								alt={title}
								height="25px"
								class="text-[$grey] transition duration-300 ease-in-out hover:text-[$complementary]"
							/>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</section>
