<script lang="ts">
	import 'iconify-icon'
	import {
		ANALYTICS_EVENT_NAME,
		SECTION,
		SECTION_TITLE
	} from '../../helpers/constants'
	import { fly } from 'svelte/transition'
	import Hamburger from 'svelte-hamburgers'
	import { onMount } from 'svelte'
	import { fireEvent } from '../../helpers/firebase'

	export let visibleSectionId: string | null

	let hasMobileNavigation: boolean = window.innerWidth < 993
	let showMobileNavigation: boolean = false
	let shouldAnimate: boolean = false

	const homeId =
		SECTION[SECTION.findIndex(item => item.title === SECTION_TITLE.HOME)].id

	onMount(() => {
		shouldAnimate = true

		window.addEventListener('resize', (): void => {
			hasMobileNavigation = window.innerWidth < 993
		})
	})

	const toggleMobileNavigation = () => {
		showMobileNavigation = !showMobileNavigation
	}

	const scrollToSection = (id: string): void => {
		fireEvent(ANALYTICS_EVENT_NAME.BUTTON_CLICK)
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
		<nav
			class={`fixed bottom-0 left-0 top-0 z-[999] transition-all duration-300 ease-linear sm:-left-[300px] sm:w-[300px] ${
				hasMobileNavigation
					? showMobileNavigation
						? 'translate-x-full'
						: '-translate-x-full'
					: ''
			}`}
		>
			<ul
				class="fixed flex h-screen flex-col justify-center gap-7 pl-4 sm:w-[calc(100vw/1.5)] sm:max-w-[300px] sm:border-r sm:border-gray-400 sm:bg-white sm:pr-4"
			>
				{#each SECTION as item, idx}
					{@const { title, icon, id } = item}
					<li transition:fly={{ x: -100, duration: 300 * idx }}>
						<a
							data-is-visible={visibleSectionId === id}
							class="group flex h-14 w-14 items-center gap-3 overflow-hidden rounded-full bg-[$secondary] pl-[13px] text-base text-[$grey] duration-300 hover:w-full hover:bg-[$complementary] hover:pr-4 hover:text-white data-[is-visible=true]:bg-[$complementary] data-[is-visible=true]:text-white sm:visible sm:w-full"
							href={`#${id}`}
							on:click|preventDefault={() => scrollToSection(id)}
						>
							<iconify-icon {icon} height="30px" />
							<span class="open-sans hidden group-hover:block sm:block"
								>{title}</span
							>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
</header>
