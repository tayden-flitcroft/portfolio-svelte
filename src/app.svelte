<style global lang="scss">
	.mobile-navigation-open {
		overflow: hidden;
	}
	body {
		display: grid;
		grid-template-columns: 1fr 6fr;
		height: 100vh;
	}

	section {
		min-height: 100vh;
	}

	a {
		color: black;
		text-decoration: none;
	}

	@media screen and (max-width: $small) {
		body {
			grid-template-columns: auto;
		}

		main {
			padding: 0 10px;
		}
	}
</style>

<script lang="ts">
	import Home from './components/home/home.svelte'
	import About from './components/about/about.svelte'
	import NavigationButtons from './components/navigation-buttons/navigation-buttons.svelte'
	import Resume from './components/resume/resume.svelte'
	import Projects from './components/projects/projects.svelte'
	import Contact from './components/contact/contact.svelte'
	import Loader from './components/loader/loader.svelte'
	import { SECTION, SECTION_TITLE } from './helpers/constants'
	import type { SectionData } from './global'
	import Footer from './components/footer/footer.svelte'
	import SectionWrapper from './components/section-wrapper/section-wrapper.svelte'

	export let showLoader = false

	const sectionDataObj = SECTION.reduce(
		(
			acc: { [key: string]: SectionData },
			item: SectionData
		): { [key: string]: SectionData } => {
			acc[item.title] = item
			return acc
		},
		{}
	)

	let visibleSectionId: string =
		SECTION[SECTION.findIndex(item => item.title === SECTION_TITLE.HOME)].id

	const isSectionVisible = (id: string): boolean => {
		const el = document.getElementById(id)
		if (!el) return false

		const rect = el.getBoundingClientRect()

		return (
			rect.bottom > 0 &&
			rect.right > 0 &&
			rect.left < window.innerWidth &&
			rect.top < window.innerHeight * 0.5 // Mark as "visible" when section is in top 50% of window
		)
	}

	window.addEventListener('scroll', (): void => {
		SECTION.forEach(({ id }) => {
			if (isSectionVisible(id)) {
				visibleSectionId = id
			}
		})
	})
</script>

{#if showLoader}
	<Loader />
{/if}

<header>
	<NavigationButtons bind:visibleSectionId />
</header>
<main>
	<Home sectionData={sectionDataObj[SECTION_TITLE.HOME]} />
	<SectionWrapper
		bind:visibleSectionId
		sectionData={sectionDataObj[SECTION_TITLE.ABOUT]}
	>
		<About sectionData={sectionDataObj[SECTION_TITLE.ABOUT]} />
	</SectionWrapper>
	<SectionWrapper
		bind:visibleSectionId
		sectionData={sectionDataObj[SECTION_TITLE.RESUME]}
	>
		<Resume sectionData={sectionDataObj[SECTION_TITLE.RESUME]} />
	</SectionWrapper>
	<SectionWrapper
		bind:visibleSectionId
		sectionData={sectionDataObj[SECTION_TITLE.PROJECTS]}
	>
		<Projects sectionData={sectionDataObj[SECTION_TITLE.PROJECTS]} />
	</SectionWrapper>
	<SectionWrapper
		bind:visibleSectionId
		sectionData={sectionDataObj[SECTION_TITLE.CONTACT]}
	>
		<Contact sectionData={sectionDataObj[SECTION_TITLE.CONTACT]} />
	</SectionWrapper>
</main>
<Footer />
