module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	purge: ['./index.html','./src/**/*.{svelte,js,ts}'],
	theme: {
		screens: {
			sm: {
				max: '993px'
			}
		},
		extend: {
			colors: {
				grey: 'var(--grey)',
				main: 'var(--main)',
				secondary: 'var(--secondary)',
				accent: 'var(--accent)',
				complementary: 'var(--complementary)'
			}
		}
	},
	plugins: []
}