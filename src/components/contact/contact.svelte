<style lang="scss">
	.checkbox-custom:checked {
		border-color: #2e9cca;
		background-color: #2e9cca;
	}
</style>

<script lang="ts">
	// import type { SectionData } from '../../global'
	import Input from '../shared/input.svelte'
	// export let sectionData: SectionData

	let checked: boolean = false

	const submitContactForm = () => {
		fetch('/test', {
			method: 'POST',
			body: JSON.stringify({
				test: 'test'
			})
		})
	}
</script>

<div class="flex justify-evenly sm:flex-col">
	<div class="border border-black"> tayden </div>
	<form
		class="flex w-full max-w-2xl flex-col gap-4 sm:max-w-full"
		on:submit|preventDefault={submitContactForm}
	>
		<div class="flex w-full gap-5 sm:flex-col">
			<Input id="first-name" inputProps={{ autocomplete: 'given-name' }}>
				First Name
			</Input>
			<Input id="last-name" inputProps={{ autocomplete: 'family-name ' }}>
				Last Name
			</Input>
		</div>
		<Input id="email" inputProps={{ autocomplete: 'email' }}>
			Email Address
		</Input>
		<Input id="subject">Subject</Input>
		<Input id="message" textArea>Message</Input>
		<div class="text-right">
			<div class="mb-3">
				<label class="flex cursor-pointer items-center text-base">
					<input type="checkbox" class="hidden" bind:checked />
					<span
						class="checkbox-custom mr-2 h-6 w-6 flex-shrink-0 rounded-md border border-gray-300 transition-colors duration-200"
					/>
					<span class="checkbox-text text-gray-700">
						Would you like to receive a copy of your message?
					</span>
				</label>
			</div>
			<button
				class="raleway rounded-lg bg-[$complementary] p-2 text-white hover:opacity-90"
				type="submit"
			>
				Send Message
			</button>
		</div>
	</form>
</div>
