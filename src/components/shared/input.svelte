<script lang="ts">
	import { onMount } from 'svelte'
	import validator from '../../helpers/validator'
	import 'iconify-icon'

	const defaultProps = {
		inputProps: {
			type: 'text'
		}
	}

	export let id: string
	export let textArea: boolean = false
	export let labelProps: LabelProps = {}
	export let inputProps: InputProps = {}
	export let error: boolean
	export let showCharacterCount: number | boolean = false
	export let maxLength: number = Infinity
	export let value: string

	let errorMessage: string | null
	let characterCount: number = 0

	let labelClassNames: string
	let inputClassNames: string

	const resizeOnInput = ({ target }: { target: any }): void => {
		target.style.height = 'auto'
		target.style.height = target.scrollHeight + 'px'
	}

	const validation = (e: any): void => {
		errorMessage = validator(e.target.id, e.target.value)
		error = !!errorMessage
	}

	const handleInput = (e: any): void => {
		characterCount = e.target.value.length
		if (error && !validator(e.target.id, e.target.value)) {
			errorMessage = null
			error = false
		}
	}

	onMount((): void => {
		labelClassNames =
			'raleway absolute left-1 top-2 origin-[0] -translate-y-4 scale-75 transform cursor-text bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[$main]'
		if (labelProps?.class) {
			labelClassNames += labelProps.class
			delete labelProps.class
		}

		inputClassNames =
			'w-full peer block appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-[$main] focus:outline-none focus:ring-0'
		if (inputProps?.class) {
			inputClassNames += inputProps.class
			delete inputProps.class
		}

		inputProps = { ...inputProps, ...defaultProps.inputProps }

		if (showCharacterCount && typeof showCharacterCount === 'number') {
			maxLength = showCharacterCount
		}
	})
</script>

<div class="flex w-full flex-col">
	<div class="relative w-full">
		{#if textArea}
			<textarea
				{id}
				bind:value
				class={`${inputClassNames} ${'resize-none'}`}
				maxlength={maxLength}
				on:blur={validation}
				on:input={e => {
					handleInput(e)
					resizeOnInput(e)
				}}
				placeholder=" "
			/>
		{:else}
			<input
				{...inputProps}
				{id}
				bind:value
				class={inputClassNames}
				maxlength={maxLength}
				on:blur={validation}
				on:input={handleInput}
				placeholder=" "
			/>
		{/if}
		<label for={id} class={labelClassNames} {...labelProps}>
			<slot />
		</label>
	</div>
	{#if errorMessage}
		<div class="poppins flex items-center gap-2 pt-2 text-xs text-red-500">
			<iconify-icon icon="material-symbols:error-outline-rounded" />
			{errorMessage}
		</div>
	{/if}
	{#if showCharacterCount}
		<div class="poppins mt-2 text-right text-xs">
			<span
				class={`${
					maxLength
						? characterCount >= Math.floor(maxLength * 0.75)
							? characterCount >= maxLength - Math.floor(maxLength * 0.1)
								? 'text-red-500'
								: 'text-yellow-500'
							: ''
						: ''
				}`}>{characterCount}</span
			>
			{#if typeof showCharacterCount === 'number'}
				<span>/ {showCharacterCount}</span>
			{/if}
		</div>
	{/if}
</div>
