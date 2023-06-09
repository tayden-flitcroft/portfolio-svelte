<script lang="ts">
	import { onMount } from 'svelte'
	import { getAboutMeContent } from '../../helpers/firebase'
	export let sectionData: SectionData
	import SvelteMarkdown from 'svelte-markdown'

	const { id } = sectionData

	let aboutMeContent: string = `# hello`

	// onMount(async () => {
	// 	aboutMeContent = await getAboutMeContent()
	// })
</script>

<section {id}> <SvelteMarkdown source={aboutMeContent} /> </section>
