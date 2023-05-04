<script lang="ts">
	import { MAX_MESSAGE_LENGTH } from '../../helpers/constants'
	import Input from '../shared/input.svelte'
	import 'iconify-icon'
	import getBaseUrl from '../../helpers/get-base-url'
	import validator from '../../helpers/validator'

	enum FormSubmissionState {
		'ERROR',
		'INITIAL',
		'SUBMITTING',
		'SUCCESS'
	}

	let formSubmissionState: FormSubmissionState = FormSubmissionState.INITIAL
	let formHasBeenSubmitted: boolean = false

	let emailErrorMessage: string
	let firstNameErrorMessage: string
	let lastNameErrorMessage: string
	let messageErrorMessage: string
	let subjectErrorMessage: string

	let emailValue: string = ''
	let firstNameValue: string = ''
	let lastNameValue: string = ''
	let messageValue: string = ''
	let subjectValue: string = ''

	const scrollToFirstError = (): void => {
		const inputs = [
			{ id: 'first-name', error: firstNameErrorMessage },
			{ id: 'last-name', error: lastNameErrorMessage },
			{ id: 'email', error: emailErrorMessage },
			{ id: 'subject', error: subjectErrorMessage },
			{ id: 'message', error: messageErrorMessage }
		]

		const idx = inputs.findIndex(
			(item: { id: string; error: string }) => !!item.error
		)

		if (idx > -1) {
			const { id } = inputs[idx]

			const element = document.getElementById(id) as HTMLElement

			element?.scrollIntoView({
				behavior: 'smooth',
				inline: 'center',
				block: 'center'
			})
			element?.focus()
		}
	}

	const validate = (): boolean => {
		emailErrorMessage = validator('email', emailValue)
		firstNameErrorMessage = validator('first-name', firstNameValue)
		lastNameErrorMessage = validator('last-name', lastNameValue)
		messageErrorMessage = validator('message', messageValue)
		subjectErrorMessage = validator('subject', subjectValue)

		scrollToFirstError()

		return !!(
			emailErrorMessage ||
			firstNameErrorMessage ||
			lastNameErrorMessage ||
			messageErrorMessage ||
			subjectErrorMessage
		)
	}

	const submitContactForm = async (): Promise<void> => {
		if (!validate()) {
			formSubmissionState = FormSubmissionState.SUBMITTING

			const oauthRes = await fetch(process.env.OAUTH_TOKEN_URL as string, {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					audience: process.env.API_URL as string,
					client_id: process.env.CLIENT_ID as string,
					client_secret: process.env.CLIENT_SECRET as string,
					grant_type: 'client_credentials'
				})
			}).catch((err: any) => {
				console.error(err)
				formSubmissionState = FormSubmissionState.ERROR
			})

			if (oauthRes?.ok) {
				try {
					const { access_token: accessToken } = await oauthRes.json()

					const res = await fetch(`${getBaseUrl()}/portfolio/contact`, {
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

					if (res.ok) {
						formSubmissionState = FormSubmissionState.SUCCESS
						formHasBeenSubmitted
					} else {
						formSubmissionState = FormSubmissionState.ERROR
					}
				} catch (err: any) {
					console.error(err)
					formSubmissionState = FormSubmissionState.ERROR
				}
			} else {
				formSubmissionState = FormSubmissionState.ERROR
				return
			}
		}
	}

	$: if (
		formSubmissionState === FormSubmissionState.ERROR ||
		formSubmissionState === FormSubmissionState.SUCCESS
	) {
		if (formSubmissionState === FormSubmissionState.SUCCESS) {
			// Reset form on success scenario
			emailValue = ''
			firstNameValue = ''
			lastNameValue = ''
			messageValue = ''
			subjectValue = ''
		}
		setTimeout(() => {
			formSubmissionState = FormSubmissionState.INITIAL
		}, 5000)
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
				bind:errorMessage={firstNameErrorMessage}
				bind:value={firstNameValue}
				id="first-name"
				inputProps={{ autocomplete: 'given-name' }}
			>
				First Name
			</Input>
			<Input
				bind:errorMessage={lastNameErrorMessage}
				bind:value={lastNameValue}
				id="last-name"
				inputProps={{ autocomplete: 'family-name ' }}
			>
				Last Name
			</Input>
		</div>
		<Input
			bind:errorMessage={emailErrorMessage}
			bind:value={emailValue}
			id="email"
			inputProps={{ autocomplete: 'email' }}
		>
			Email Address
		</Input>
		<Input
			id="subject"
			bind:value={subjectValue}
			bind:errorMessage={subjectErrorMessage}
		>
			Subject
		</Input>
		<Input
			bind:errorMessage={messageErrorMessage}
			bind:value={messageValue}
			id="message"
			showCharacterCount={MAX_MESSAGE_LENGTH}
			textArea
		>
			Message
		</Input>

		<!-- Submit Button -->
		<div class="flex justify-end">
			{#if formSubmissionState === FormSubmissionState.SUBMITTING}
				<button
					class="raleway my-4 flex h-10 min-w-[220px] cursor-progress items-center justify-center rounded-lg bg-[$grey] text-white sm:w-full"
					disabled
				>
					<div class="roll-up"> Sending... </div>
				</button>
			{:else if formSubmissionState === FormSubmissionState.SUCCESS}
				<button
					class="raleway my-4 flex h-10 min-w-[220px] cursor-not-allowed items-center justify-center rounded-lg bg-[$main] text-white sm:w-full"
				>
					<div class="roll-down flex items-center justify-center">
						<span class="pr-2"> Successfully Sent </span>
						<iconify-icon icon="eva:checkmark-fill" width="20" />
					</div>
				</button>
			{:else if formSubmissionState === FormSubmissionState.ERROR}
				<button
					class="raleway my-4 flex h-10 min-w-[220px] cursor-not-allowed items-center justify-center rounded-lg bg-red-500 text-white sm:w-full"
				>
					<div class="roll-down flex items-center justify-center">
						<span class="pr-2"> Error Occurred. Try Again. </span>
						<iconfiy-icon icon="akar-icons:circle-x-fill" width="20" />
					</div>
				</button>
			{:else}
				<button
					class="raleway my-4 flex h-10 min-w-[220px] items-center justify-center rounded-lg bg-[$complementary] text-white transition duration-300 ease-in-out hover:opacity-80 sm:w-full"
					type="submit"
				>
					<span class={formHasBeenSubmitted ? 'roll-down' : ''}>
						Send Message
					</span>
				</button>
			{/if}
		</div>
	</form>
</div>
