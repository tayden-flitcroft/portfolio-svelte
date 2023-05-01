<script lang="ts">
	import { MAX_MESSAGE_LENGTH } from '../../helpers/constants'
	import Input from '../shared/input.svelte'
	import 'iconify-icon'

	// default state for error is true to prevent submitting empty form
	let firstNameHasError: boolean = true
	let lastNameHasError: boolean = true
	let subjectHasError: boolean = true
	let emailHasError: boolean = true
	let messageHasError: boolean = true

	const formHasError = (): boolean => {
		return !!(
			firstNameHasError ||
			lastNameHasError ||
			subjectHasError ||
			emailHasError ||
			messageHasError
		)
	}

	const submitContactForm = async () => {
		if (!formHasError()) {
			fetch('/test', {
				method: 'POST',
				body: JSON.stringify({
					test: 'test'
				})
			})
		}
	}
</script>

<div class="flex justify-between gap-3 sm:flex-col">
	<div class="flex flex-col">
		<button>
			<iconify-icon
				icon="material-symbols:location-on-outline"
				height="25"
				class="rounded-full border border-transparent bg-[$accent] p-3 transition duration-300 ease-in-out hover:bg-[$main] hover:text-white"
			/>
			Location: San Antonio, Texas
		</button>
		<a class="my-11" href="mailto:contact@taydenflitcroft.com">
			<iconify-icon
				icon="mdi:email-outline"
				class="rounded-full border border-transparent bg-[$accent] p-3 transition duration-300 ease-in-out hover:bg-[$main] hover:text-white"
				height="25"
			/>
			Email: contact@taydenflitcroft.com
		</a>
		<a href="tel:503-569-7894">
			<iconify-icon
				class="rounded-full border border-transparent bg-[$accent] p-3 transition duration-300 ease-in-out hover:bg-[$main] hover:text-white"
				icon="material-symbols:phone-android-outline-rounded"
				height="25"
			/>
			Call: +1 (503) 569-7894
		</a>
	</div>
	<form
		class="flex w-full max-w-2xl flex-col gap-4 sm:max-w-full"
		on:submit|preventDefault={submitContactForm}
	>
		<div class="flex w-full gap-5 sm:flex-col">
			<Input
				id="first-name"
				inputProps={{ autocomplete: 'given-name' }}
				bind:error={firstNameHasError}
			>
				First Name
			</Input>
			<Input
				id="last-name"
				inputProps={{ autocomplete: 'family-name ' }}
				bind:error={lastNameHasError}
			>
				Last Name
			</Input>
		</div>
		<Input
			id="email"
			inputProps={{ autocomplete: 'email' }}
			bind:error={emailHasError}
		>
			Email Address
		</Input>
		<Input id="subject" bind:error={subjectHasError}>Subject</Input>
		<Input
			id="message"
			textArea
			bind:error={messageHasError}
			showCharacterCount={MAX_MESSAGE_LENGTH}>Message</Input
		>
		<div class="text-right">
			<button
				class="raleway rounded-lg bg-[$complementary] p-2 text-white transition duration-300 ease-in-out hover:opacity-70"
				type="submit"
			>
				Send Message
			</button>
		</div>
	</form>
</div>
