const path = require('path')

const defaultWebPackConfig = require('./defaultWebpackConfig')
const {
	getCustomWebpackConfig
} = require('../modules/utils')

const { ENV_DEV } = require('../modules/constVar.js')

module.exports = (appPath) => {
	let webpackConfig = defaultWebPackConfig(appPath, ENV_DEV)
	webpackConfig.watch = true
	webpackConfig.devtool = 'source-map'
	return getCustomWebpackConfig(appPath, ENV_DEV)(webpackConfig, appPath)
}