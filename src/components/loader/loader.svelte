<style lang="scss">
	.four-dots {
		&:before {
			animation: spin 1s infinite;
			box-shadow: 20px 0 0 5px $main, 0 20px 0 5px $complementary,
				0 (20px * -1) 0 5px $complementary, -(20px) 0 0 5px $main;
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>

<div
	class="four-dots before:content=[''] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 before:block before:h-[5px] before:w-[5px] before:rounded-full"
/>
