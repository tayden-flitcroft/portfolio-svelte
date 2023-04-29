<script lang="ts">
	import { onMount } from 'svelte'
	import type { LabelProps, InputProps } from '../../global'

	const defaultProps = {
		inputProps: {
			type: 'text'
		}
	}

	export let id: string
	export let textArea: boolean = false
	export let labelProps: LabelProps = {}
	export let inputProps: InputProps = {}

	let labelClassNames: string
	let inputClassNames: string

	const resizeOnInput = ({ target }: { target: any }) => {
		target.style.height = 'auto'
		target.style.height = target.scrollHeight + 'px'
	}

	onMount(() => {
		labelClassNames =
			'raleway absolute left-1 top-2 origin-[0] -translate-y-4 scale-75 transform cursor-text bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[$main] '
		if (labelProps?.class) {
			labelClassNames += labelProps.class
			delete labelProps.class
		}

		inputClassNames =
			'w-full peer block appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-[$main] focus:outline-none focus:ring-0 '
		if (inputProps?.class) {
			inputClassNames += inputProps.class
			delete inputProps.class
		}

		inputProps = { ...inputProps, ...defaultProps.inputProps }
	})
</script>

<div class="relative w-full">
	{#if textArea}
		<textarea
			class={`${inputClassNames} ${'resize-none'}`}
			on:input={resizeOnInput}
		/>
	{:else}
		<input {id} class={inputClassNames} placeholder=" " {...inputProps} />
	{/if}
	<label for={id} class={labelClassNames} {...labelProps}>
		<slot />
	</label>
</div>
