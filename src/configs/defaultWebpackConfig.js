const path = require('path')
const fs = require('fs-extra')
const getLoader = require('../modules/webpack/loaders.js')
const getPlugins = require('../modules/webpack/plugins.js')

const { ENV_DEV, ENV_PROD } = require('../modules/constVar.js')

module.exports = (appPath, env, bundleConfig) => {
	let {
		dist = path.join(appPath, './dist'),
		hash = true,
		src = path.join(appPath, 'src')
	} = bundleConfig
	let {
		entry = { index: path.join(src, 'index.js') },
	} = bundleConfig

	Object.keys(entry).forEach((key) => {
		entry[key] = [].concat(['@babel/polyfill'], typeof (entry[key]) === 'string' ? [entry[key]] : entry[key])
	})

	let defaultWebpackConfig = {
		mode: env,
		target: 'web',
		entry,
		output: {
			path: dist,
			filename: env === ENV_PROD && hash ? `js/[name].[chunkHash].js` : `js/[name].js`,
			// libraryTarget: 'umd',
		},
		module: {
			rules: getLoader(appPath, env, bundleConfig)
		},
		plugins: getPlugins(appPath, env, bundleConfig),
		resolveLoader: {
			modules: [
				'node_modules',
				path.join(__dirname, '../../node_modules')
			]
		},
		resolve: {
			alias: {
				'@': src
			},
			modules: [
				'node_modules',
				path.join(appPath, 'node_modules'),
				path.join(__dirname, '../../node_modules')
			],
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
		}
	}

	return defaultWebpackConfig
}