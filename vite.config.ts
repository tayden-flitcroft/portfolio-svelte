import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcssConfig from './postcss.config.js'
import type { Adapter } from 'vite-plugin-mix'
import mixPlugin from 'vite-plugin-mix'

interface MixConfig {
  handler: string
  adapter?: Adapter | undefined
}

type MixPlugin = (config: MixConfig) => Plugin

interface Mix {
  default: MixPlugin
}

const mix = (mixPlugin as unknown as Mix).default

export default defineConfig(() => {
	const plugins = [
		svelte()
	]

	if (process.env.NODE_ENV === 'development') {
		plugins.push(mix({
			handler: './mock-routes.ts'
		})
		)
	}
	
	return {
		server: {
			host: 'dev.taydenflitcroft.com',
			port: 3000,
			strictPort: true,
			open: false
		},
		plugins,
		css: {
			postcss: postcssConfig
		}
	}
})
