<script lang="ts">
	import { SOCIAL_MEDIA } from '../../helpers/constants'
</script>

<footer
	class="flex flex-col items-center justify-center gap-5 bg-[$accent] p-8 text-center"
>
	<div class="inline-flex w-full items-center justify-center">
		<hr
			class="my-8 h-1 w-64 rounded border-0 bg-[$complementary] dark:bg-gray-700"
		/>
		<div
			class="absolute left-1/2 -translate-x-1/2 bg-[$accent] px-4 dark:bg-gray-900"
		>
			<svg
				aria-hidden="true"
				class="h-5 w-5 text-gray-700 dark:text-gray-300"
				viewBox="0 0 24 27"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
					fill="currentColor"
				/></svg
			>
		</div>
	</div>

	<div class="open-sans">
		<q class="mb-3 block">
			Any fool can write code that a computer can understand. Good programmers
			write code that humans can understand.
		</q>
		<i class="block font-extrabold sm:text-center"> ~ Martin Fowler ~ </i>
	</div>
	<hr
		class="my-8 h-1 w-64 rounded border-0 bg-[$complementary] dark:bg-gray-700"
	/>
	<ul class="mt-5 flex gap-6">
		{#each SOCIAL_MEDIA as item}
			{@const { icon, href, title } = item}
			<li>
				<a
					class="flex h-10 w-10 items-center justify-center rounded-full bg-[$secondary] text-white hover:opacity-80"
					rel="noreferrer"
					{href}
					target="_blank"
				>
					<iconify-icon {icon} alt={title} height="20px" />
				</a>
			</li>
		{/each}
	</ul>
	<div class="open-sans mt-4 text-xs">
		Created and Designed by Tayden Flitcroft
		<div class="mt-1">
			&#xa9; {new Date().getFullYear()}
		</div>
	</div>
</footer>
