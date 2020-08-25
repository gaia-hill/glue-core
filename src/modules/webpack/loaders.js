const path = require('path')
const { ENV_DEV, ENV_PROD } = require('../constVar.js')

const getCssLoader = require('./cssLoader.js')
const getBabelLoader = require('./babelLoader.js')
const getTsLoader = require('./tsLoader.js')
const getVueLoader = require('./vueLoader.js')

module.exports = (appPath, env, bundleConfig) => {
	let {
		hash = true,
		happypack = false
	} = bundleConfig
	const loaders = [
		{
			test: /\.jsx?$/,
			use: happypack ? 'happypack/loader?id=babel' : [getBabelLoader(appPath, env, bundleConfig)]
		},
		{
			test: /\.tsx?$/,
			use: happypack ? 'happypack/loader?id=ts' : [getBabelLoader(appPath, env, bundleConfig), getTsLoader(appPath, env, bundleConfig)]
		},
		...getVueLoader(appPath, env, bundleConfig),
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