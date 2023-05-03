<script lang="ts">
	import { MAX_MESSAGE_LENGTH } from '../../helpers/constants'
	import Input from '../shared/input.svelte'
	import 'iconify-icon'
	import getBaseUrl from '../../helpers/get-base-url'

	// default state for error is true to prevent submitting empty form
	let firstNameHasError: boolean = true
	let lastNameHasError: boolean = true
	let subjectHasError: boolean = true
	let emailHasError: boolean = true
	let messageHasError: boolean = true

	let emailValue: string
	let firstNameValue: string
	let lastNameValue: string
	let messageValue: string
	let subjectValue: string

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
			const oauthRes = await fetch(process.env.OAUTH_TOKEN_URL as string, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					audience: 'https://api.taydenflitcroft.com',
					client_id: process.env.CLIENT_ID as string,
					client_secret: process.env.CLIENT_SECRET as string,
					grant_type: 'client_credentials'
				})
			})
			const { access_token: accessToken } = await oauthRes.json()

			fetch(`${getBaseUrl()}/portfolio/contact`, {
				method: 'POST',
				body: JSON.stringify({
					emailMessage: messageValue,
					returnEmail: emailValue,
					senderName: `${firstNameValue} ${lastNameValue}`,
					sendConfirmationEmail: true,
					emailSubject: subjectValue
				}),
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${accessToken}`
				}
			})
		}
	}
</script>

<div class="flex justify-around gap-3 sm:flex-col sm:gap-10">
	<div class="flex flex-col sm:w-fit sm:self-start">
		<a
			href="https://maps.google.com/?q=San Antonio, Texas"
			target="_blank"
			class="open-sans group flex items-center gap-4 text-lg"
		>
			<iconify-icon
				icon="material-symbols:location-on-outline"
				height="25"
				class="rounded-full border border-transparent bg-[$accent] p-3 transition duration-300 ease-in-out group-hover:bg-[$main] group-hover:text-white"
			/>
			<span class="text-gray-600"> San Antonio, Texas </span>
		</a>
		<a
			class="open-sans group my-11 flex items-center gap-4 text-lg"
			href="mailto:contact@taydenflitcroft.com"
		>
			<iconify-icon
				icon="mdi:email-outline"
				class="rounded-full border border-transparent bg-[$accent] p-3 transition duration-300 ease-in-out group-hover:bg-[$main] group-hover:text-white"
				height="25"
			/>
			<span class="text-gray-600"> contact@taydenflitcroft.com </span>
		</a>
		<a
			href="tel:503-569-7894"
			class="open-sans group flex items-center gap-4 text-lg"
		>
			<iconify-icon
				class="rounded-full border border-transparent bg-[$accent] p-3 transition duration-300 ease-in-out group-hover:bg-[$main] group-hover:text-white"
				icon="material-symbols:phone-android-outline-rounded"
				height="25"
			/>
			<span class="text-gray-600"> +1 (503) 569-7894 </span>
		</a>
	</div>
	<form
		class="flex w-full max-w-2xl flex-col gap-4 sm:max-w-full"
		on:submit|preventDefault={submitContactForm}
	>
		<div class="flex w-full gap-5 sm:flex-col">
			<Input
				bind:error={firstNameHasError}
				bind:value={firstNameValue}
				id="first-name"
				inputProps={{ autocomplete: 'given-name' }}
			>
				First Name
			</Input>
			<Input
				bind:error={lastNameHasError}
				bind:value={lastNameValue}
				id="last-name"
				inputProps={{ autocomplete: 'family-name ' }}
			>
				Last Name
			</Input>
		</div>
		<Input
			bind:error={emailHasError}
			bind:value={emailValue}
			id="email"
			inputProps={{ autocomplete: 'email' }}
		>
			Email Address
		</Input>
		<Input id="subject" bind:value={subjectValue} bind:error={subjectHasError}>
			Subject
		</Input>
		<Input
			bind:error={messageHasError}
			bind:value={messageValue}
			id="message"
			showCharacterCount={MAX_MESSAGE_LENGTH}
			textArea
		>
			Message
		</Input>
		<div class="text-right sm:text-center">
			<button
				class="raleway rounded-lg bg-[$complementary] p-2 text-white transition duration-300 ease-in-out hover:opacity-70 sm:w-full"
				type="submit"
			>
				Send Message
			</button>
		</div>
	</form>
</div>
