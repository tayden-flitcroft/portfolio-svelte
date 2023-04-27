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
			background: #0563bb;
			bottom: 0;
			left: calc(50% - 20px);
		}
	}
</style>

<script lang="ts">
	export let title: string
	export let subheader: string = ''
</script>

<div class="text-center">
	<h2 class="relative mb-5 pb-5 uppercase text-[$main]">{title}</h2>
	{#if subheader}
		<div>{subheader}</div>
	{/if}
</div>

<slot />
