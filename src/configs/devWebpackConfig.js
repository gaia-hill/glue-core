const path = require('path')
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
const defaultWebPackConfig = require('./defaultWebpackConfig')
const {
	getCustomWebpackConfig
} = require('../modules/utils')

const { ENV_DEV } = require('../modules/constVar.js')

module.exports = (appPath, bundleConfig) => {
	let webpackConfig = defaultWebPackConfig(appPath, ENV_DEV, bundleConfig)
	webpackConfig.devtool = 'eval-cheap-module-source-map'
	const customConfig = getCustomWebpackConfig(appPath)(webpackConfig, appPath, ENV_DEV)
	return customConfig ? customConfig : webpackConfig
	// return (new SpeedMeasurePlugin()).wrap(getCustomWebpackConfig(appPath)(webpackConfig, appPath, ENV_DEV))
}