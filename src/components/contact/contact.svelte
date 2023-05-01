<script lang="ts">
	import { MAX_MESSAGE_LENGTH } from '../../helpers/constants'
	import Input from '../shared/input.svelte'

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

<div class="flex justify-evenly gap-3 sm:flex-col">
	<div class="border border-black"> tayden </div>
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
				class="raleway rounded-lg bg-[$complementary] p-2 text-white hover:opacity-90"
				type="submit"
			>
				Send Message
			</button>
		</div>
	</form>
</div>
