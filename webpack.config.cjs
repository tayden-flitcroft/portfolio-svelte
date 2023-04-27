const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const IS_DEV = process.env.NODE_ENV === 'development'

module.exports = {
	mode: IS_DEV ? 'development' : 'production',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].min.js'
	},
	resolve: {
		extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.svelte']
	},
	devServer: {
		allowedHosts: ['0.0.0.0', 'dev.taydenflitcroft.com'],
		historyApiFallback: true,
		hot: true,
		port: 3000
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './template/index.html',
			minify: {
				collapseWhitespace: !IS_DEV
			}
		}),
		new Dotenv()
	],
	module: {
		rules: [
			{
				test: /\.(t|j)sx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				loader: 'svelte-loader',
				options: {
					compilerOptions: {
						dev: IS_DEV
					},
					hot: IS_DEV,
					css: css => css.write('bundle.css'),
					preprocess: require('svelte-preprocess')({
						babel: true,
						scss: { prependData: '@import "src/styles/variables";' },
						postcss: { plugins: [require('autoprefixer')] }
					}),
					onwarn: (warning, handler) => {
						const { code } = warning
						if (code === 'css-unused-selector')
							return
				
						handler(warning)
					}
				}
			},
			{
				test: /\.s?(a|c)ss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' },
					{ loader: 'postcss-loader' }
				]
			},
			{
				test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.pdf$|\.mp4$|\.webp$/,
				type: 'asset/resource'
			}
		]
	},
	optimization: {
		minimize: !IS_DEV,
		minimizer: [new TerserPlugin()]
	},
	performance: false
}