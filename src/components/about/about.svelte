<script lang="ts">
	import type { SectionData } from '../../global'
	import { SECTION, SECTION_TITLE } from '../../helpers/constants'
	export let sectionData: SectionData

	const { id, title, icon } = sectionData
</script>

<section {id}> about </section>
