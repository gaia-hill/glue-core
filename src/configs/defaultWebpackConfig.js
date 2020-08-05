const path = require('path')
const fs = require('fs-extra')
const {
	getCustomBundleConfig
} = require('../modules/utils')
const getLoader = require('../modules/webpack/loaders.js')
const getPlugins = require('../modules/webpack/plugins.js')
const getDevServerConfig = require('./devServer.js')

const { ENV_DEV, ENV_PROD } = require('../modules/constVar.js')

module.exports = (appPath, env) => {
	let {
		entry = { index: path.join(appPath, './src/index.js') },
		dist = path.join(appPath, './dist'),
		hash = true
	} = getCustomBundleConfig(appPath, env)

	const devServerConfig = getDevServerConfig(appPath, env)

	if (env === ENV_DEV && devServerConfig.hot) {
		Object.keys(entry).forEach((key) => {
			if (fs.existsSync(entry[key])) {
				let data = fs.readFileSync(entry[key])
				if (data.indexOf('module.hot.accept') < 0) {
					fs.appendFileSync(entry[key], '\nif(module.hot) { module.hot.accept() }\n')
				}
			}
		})
	}

	let defaultWebpackConfig = {
		mode: env,
		target: 'web',
		entry,
		output: {
			path: dist,
			filename: env === ENV_PROD && hash ? `js/[name].[contenthash].js` : `js/[name].js`,
			libraryTarget: 'umd',
		},
		module: {
			rules: getLoader(appPath, env)
		},
		plugins: getPlugins(appPath, env),
		resolveLoader: {
			moduleExtensions: ['-loader', '*'],
			modules: [
				path.join(__dirname, '../../node_modules'),
				'node_modules'
			]
		},
		resolve: {
			modules: [
				path.join(__dirname, '../../node_modules'),
				path.join(appPath, 'node_modules'),
				'node_modules'
			],
			extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
		}
	}

	return defaultWebpackConfig
}