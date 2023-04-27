<style lang="scss">
	.four-dots {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		&:before {
			display: block;
			height: 5px;
			width: 5px;
			content: '';
			animation: spin 1s infinite;
			border-radius: 100%;
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

<div class="four-dots" />
