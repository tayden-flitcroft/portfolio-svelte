<style lang="scss">
	.typed-wrapper {
		font-family: Poppins;

		#typed-roles {
			color: $main;
		}
	}

	iconify-icon {
		color: $grey;

		&:hover {
			color: $complementary;
		}
	}
</style>

<script lang="ts">
	import { onMount } from 'svelte'
	import Typed from 'typed.js'
	import 'iconify-icon'
	import { SOCIAL_MEDIA, I_AM_STRINGS } from '../../helpers/constants'
	import type { SectionData } from '../../global'

	export let sectionData: SectionData

	const { title, id, icon } = sectionData

	onMount(() => {
		new Typed('#typed-roles', {
			backDelay: 2500,
			backSpeed: 75,
			loop: true,
			smartBackspace: true,
			strings: I_AM_STRINGS,
			typeSpeed: 50
		})
	})
</script>

<section
	class="flex flex-col justify-center gap-4 sm:items-center sm:text-center"
	{id}
>
	<h1 class="text-6xl">Tayden Flitcroft</h1>
	<div class="typed-wrapper text-2xl">
		I'm a <span id="typed-roles" />
	</div>

	<ul class="mt-5 flex gap-6">
		{#each SOCIAL_MEDIA as item}
			{@const { icon, href, title } = item}
			<li>
				<a rel="noreferrer" {href} target="_blank">
					<iconify-icon {icon} alt={title} height="25px" />
				</a>
			</li>
		{/each}
	</ul>
</section>
