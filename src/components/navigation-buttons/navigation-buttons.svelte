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
	import { fade } from 'svelte/transition'
	import Hamburger from 'svelte-hamburgers'

	let showMobileNavigation: boolean = false

	const toggleMobileNavigation = () => {
		showMobileNavigation = !showMobileNavigation
	}

	const scrollToSection = (id: string): void => {
		if (showMobileNavigation) {
			toggleMobileNavigation()
		}
		document
			?.getElementById(id)
			?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	let visibleId: string =
		SECTION[SECTION.findIndex(item => item.title === SECTION_TITLE.HOME)].id

	const isSectionVisible = (id: string): boolean => {
		const el = document.getElementById(id)
		if (!el) return false

		const rect = el.getBoundingClientRect()

		return (
			rect.bottom > 0 &&
			rect.right > 0 &&
			rect.left < window.innerWidth &&
			rect.top < window.innerHeight * 0.35 // Mark as "visible" when section is in top 35% of window
		)
	}

	window.addEventListener('scroll', (): void => {
		SECTION.forEach(({ id }) => {
			if (isSectionVisible(id)) {
				visibleId = id
			}
		})
	})

	$: showMobileNavigation
		? document.body.classList.add('mobile-navigation-open')
		: document.body.classList.remove('mobile-navigation-open')
</script>

<div
	class={`hidden sm:fixed sm:right-3 sm:top-3 sm:block ${
		showMobileNavigation ? 'rounded-full bg-[color:$complementary]' : ''
	}`}
>
	<Hamburger bind:open={showMobileNavigation} />
</div>

{#if visibleId !== 'home'}
	<button
		class="fixed bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-[color:$main] text-white hover:opacity-80"
		on:click={() => {
			scrollToSection(
				SECTION[SECTION.findIndex(item => item.title === SECTION_TITLE.HOME)].id
			)
		}}
		transition:fade={{ duration: 300 }}
	>
		<iconify-icon icon="ph:arrow-up" height="25px" />
	</button>
{/if}

<nav class={`${showMobileNavigation ? 'open' : ''}`}>
	<ul class="fixed flex h-screen flex-col justify-center gap-7 pl-4">
		{#each SECTION as item, idx}
			{@const { title, icon, id } = item}
			<li transition:fade={{ duration: 250 * idx }}>
				<a
					data-is-visible={visibleId === id}
					class="flex h-14 w-14 items-center rounded-full pl-3 text-base hover:pr-3"
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
