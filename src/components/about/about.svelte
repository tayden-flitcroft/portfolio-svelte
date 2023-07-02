<script lang="ts">
	import { onMount } from 'svelte'
	import {
		getAboutMeContent,
		getContactInformation,
		getHeadshotPhoto
	} from '../../helpers/firebase'
	import SvelteMarkdown from 'svelte-markdown'
	import 'iconify-icon'

	export let sectionData: SectionData
	const { id } = sectionData

	let aboutMeContent: string
	let normalizedContactInformation = {} as NormalizedContactInformation
	let headshotPhoto: string

	onMount(async () => {
		aboutMeContent = await getAboutMeContent()
		const contactInformation: ContactInformation = await getContactInformation()
		headshotPhoto = await getHeadshotPhoto()

		normalizedContactInformation.address = `${contactInformation?.address.city}, ${contactInformation?.address.state}`

		const dob = new Date(
			`${contactInformation.birthday.month}/${contactInformation.birthday.day}/${contactInformation.birthday.year}`
		)

		const [_dayOfWeek, month, day, year] = dob.toDateString().split(' ')

		const today = new Date()
		let age = today.getFullYear() - dob.getFullYear()
		const m = today.getMonth() - dob.getMonth()
		if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
			age--
		}

		normalizedContactInformation.birthday = `${day} ${month} ${year}`
		normalizedContactInformation.age = age
		normalizedContactInformation['Phone Number'] =
			contactInformation.phoneNumber
	})
</script>

<section {id} class="flex gap-8 sm:flex-col">
	<div>
		<img alt="" src={headshotPhoto} class="max-w-lg sm:w-full sm:max-w-none" />
	</div>
	<div class="flex flex-col gap-8">
		<span class="sm:text-center">
			<SvelteMarkdown source={aboutMeContent} />
		</span>
		<div class="flex justify-between gap-8 sm:flex-col">
			{#if normalizedContactInformation}
				{#each Object.keys(normalizedContactInformation) as item}
					<div
						class="open-sans relative flex whitespace-nowrap sm:w-fit sm:justify-center"
					>
						<iconify-icon
							class="relative bottom-4 left-1"
							icon="fluent:caret-down-right-16-filled"
							height="25"
						/>
						<div>
							<span class="font-extrabold capitalize">{item}</span>:
							<span> {normalizedContactInformation[item]} </span>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</section>
