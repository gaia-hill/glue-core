
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { ENV_DEV, ENV_PROD } = require('../constVar.js')

module.exports = (appPath, env) => {
	const cssLoader = [
		'cache-loader',
		env === ENV_PROD && MiniCssExtractPlugin.loader,
		env === ENV_DEV && { loader: 'style-loader' },
		{ loader: 'css-loader' , options: { sourceMap: env === ENV_DEV }},
		{
			loader: 'postcss-loader',
			options: {
				config: {
					path: path.resolve(__dirname, '../../configs/postcss.config.js'),
					ctx: { env }
				}
			},
		}
	].filter(loader => loader)

	const loaders = {
		css: cssLoader,
		less: [
			...cssLoader,
			{ loader: 'less-loader', options: { sourceMap: env === ENV_DEV, javascriptEnabled: true } }
		],
		stylus: [
			...cssLoader,
			{ loader: 'stylus-loader', options: { sourceMap: env === ENV_DEV } }
		],
		sass: [
			...cssLoader,
			{ loader: 'sass-loader', options: { sourceMap: env === ENV_DEV } }
		],
		scss: [
			...cssLoader,
			{ loader: 'sass-loader', options: { sourceMap: env === ENV_DEV } }
		],
		postcss: cssLoader
	}

	return loaders
}