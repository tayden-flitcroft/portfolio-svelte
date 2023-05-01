<style lang="scss">
	a {
		background: $secondary;
		color: $grey;
		transition: 0.3s;
		overflow: hidden;

		&[data-is-visible='true'] {
			background: $complementary;
			color: #fff;
		}

		&:hover {
			background-color: $complementary;
			color: #fff;
			width: 100%;

			span {
				display: block;
			}
		}

		span {
			font-family: 'Open Sans';
			display: none;
		}
	}

	@media screen and (max-width: $small) {
		.open {
			transform: translateX(0%);
			animation-duration: 1s;
			left: 0;
		}
		nav {
			left: -300px;
			position: fixed;
			transition: all 0.5s;
			z-index: 999;

			ul {
				background-color: white;
				border-right: 1px solid lightgray;
				max-width: 300px;
				padding-right: 16px;
				width: calc(100vw / 1.5);

				a {
					width: 100%;
					overflow: visible;
					padding-right: 12px;
					span {
						display: block;
					}
				}
			}
		}
	}
</style>

<script lang="ts">
	import 'iconify-icon'
	import { SECTION, SECTION_TITLE } from '../../helpers/constants'
	import { fly } from 'svelte/transition'
	import Hamburger from 'svelte-hamburgers'
	import { onMount } from 'svelte'

	export let visibleSectionId: string | null

	let showMobileNavigation: boolean = false
	let shouldAnimate: boolean = false

	const homeId =
		SECTION[SECTION.findIndex(item => item.title === SECTION_TITLE.HOME)].id

	onMount(() => {
		shouldAnimate = true
	})

	const toggleMobileNavigation = () => {
		showMobileNavigation = !showMobileNavigation
	}

	const scrollToSection = (id: string): void => {
		if (showMobileNavigation) {
			toggleMobileNavigation()
		}

		const yOffset = -60 // Offset to back off the section title from top of the viewport
		const element = document.getElementById(id) as HTMLElement
		const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

		window.scrollTo({ top: y, behavior: 'smooth' })
	}

	$: showMobileNavigation
		? document.body.classList.add('mobile-navigation-open')
		: document.body.classList.remove('mobile-navigation-open')
</script>

<header>
	<div
		class={`hidden sm:fixed sm:right-3 sm:top-3 sm:block ${
			showMobileNavigation ? 'rounded-full bg-[color:$complementary]' : ''
		}`}
	>
		<Hamburger bind:open={showMobileNavigation} />
	</div>

	{#if visibleSectionId && visibleSectionId !== homeId}
		<button
			class="fixed bottom-3 right-3 z-[9999] flex h-11 w-11 items-center justify-center rounded-full bg-[color:$main] text-white transition duration-300 ease-in-out hover:opacity-80"
			on:click|preventDefault={() => {
				scrollToSection(homeId)
			}}
			transition:fly={{ y: 100, duration: 400 }}
		>
			<iconify-icon icon="ph:arrow-up" height="25px" />
		</button>
	{/if}
	{#if shouldAnimate}
		<nav class={`fixed z-50 ${showMobileNavigation ? 'open' : ''}`}>
			<ul class="fixed flex h-screen flex-col justify-center gap-7 pl-4">
				{#each SECTION as item, idx}
					{@const { title, icon, id } = item}
					<li transition:fly={{ x: -100, duration: 300 * idx }}>
						<a
							data-is-visible={visibleSectionId === id}
							class="flex h-14 w-14 items-center rounded-full pl-3 text-base duration-300 hover:pr-3"
							href={`#${id}`}
							on:click|preventDefault={() => scrollToSection(id)}
						>
							<iconify-icon {icon} height="30px" class="pr-2" />
							<span>{title}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
