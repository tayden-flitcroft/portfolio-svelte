<style lang="scss">
	h2 {
		&:before {
			content: '';
			position: absolute;
			display: block;
			width: 120px;
			height: 1px;
			background: #ddd;
			bottom: 1px;
			left: calc(50% - 60px);
		}

		&:after {
			content: '';
			position: absolute;
			display: block;
			width: 40px;
			height: 3px;
			background: $complementary;
			bottom: 0;
			left: calc(50% - 20px);
		}
	}
</style>

<script lang="ts">
	import { fly } from 'svelte/transition'

	export let sectionData: SectionData
	export let subheader: string = ''
	export let visibleSectionId: string | null

	let shouldAnimateSection: boolean = false

	const { title, id } = sectionData

	$: if (visibleSectionId === id) {
		shouldAnimateSection = true
	}
</script>

<section {id} class="pr-3 sm:pr-0">
	<!-- {#if shouldAnimateSection} -->
	<div transition:fly={{ y: 100, duration: 1000 }}>
		<div class="text-center">
			<h2 class="relative mb-5 pb-5 uppercase text-[$main]">{title}</h2>
			{#if subheader}
				<div>{subheader}</div>
			{/if}
		</div>
		<slot />
	</div>
	<!-- {/if} -->
</section>
