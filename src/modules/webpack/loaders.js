const path = require('path')
const { ENV_DEV, ENV_PROD } = require('../constVar.js')

const getCssLoader = require('./cssLoader.js')
const getBabelLoader = require('./babelLoader.js')
const getVueLoader = require('./vueLoader.js')
const getTsLoader = require('./tsLoader.js')

const {
	getCustomBundleConfig
} = require('../utils')

module.exports = (appPath, env) => {
	let {
		hash = true
	} = getCustomBundleConfig(appPath, env)
	const loaders = [
		{
			test: /\.jsx?$/,
			use: [getBabelLoader(appPath, env)]
		},
		{
			test: /\.tsx?$/,
			use: [
				getBabelLoader(appPath, env),
				getTsLoader(appPath, env)
			]
		},
		...getVueLoader(appPath, env),
		...getCssLoader(appPath, env),
		{
			test: /\.(png|jpe?g|gif)$/i,
			use: [
				{
					loader: 'file-loader', options: {
						name: env === ENV_PROD && hash ? '[name].[ext]' : '[name].[contenthash].[ext]'
					}
				},
			],
		}
	].filter(loader => loader)

	return loaders
}