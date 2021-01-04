const TerserJSPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const defaultWebPackConfig = require('./defaultWebpackConfig')
const {
	getCustomWebpackConfig
} = require('../modules/utils')

const { ENV_PROD } = require('../modules/constVar.js')

module.exports = (appPath, bundleConfig) => {
	let webpackConfig = defaultWebPackConfig(appPath, ENV_PROD, bundleConfig)
	webpackConfig.devtool = false
	webpackConfig.optimization = {
		minimizer: [
			new TerserJSPlugin({
				cache: true,
				parallel: true
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					autoprefixer: false,
					safe: true,
				}
			})
		]
	}
	const customConfig = getCustomWebpackConfig(appPath)(webpackConfig, appPath, ENV_PROD)
	return customConfig ? customConfig : webpackConfig
}