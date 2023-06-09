import sveltePreprocess from 'svelte-preprocess'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

export default {
	compilerOptions: {
		dev: true
	},
	css: css => css.write('bundle.css'),
	preprocess: sveltePreprocess({
		sourceMap: true,
		babel: true,
		scss: { prependData: '@import "src/styles/variables";' },
		postcss: { plugins: [tailwindcss, autoprefixer] }
	}),
	onwarn: (warning, handler) => {
		const { code } = warning
		if (code === 'css-unused-selector')
			return

		handler(warning)
	}
}