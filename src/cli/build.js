const getWebpackConfig = require('../modules/webpack')
const webpack = require('webpack')
const {ENV_PROD} = require('../modules/constVar.js')
const chalk = require('chalk')
const {
	getCustomBundleConfig
} = require('../modules/utils')

module.exports = (argv)=>{
	const bundleConfig = getCustomBundleConfig(argv.cwd, ENV_PROD)
	const configs = getWebpackConfig(argv.cwd, ENV_PROD, bundleConfig)
	const compiler = webpack(configs, (err, stat) => {
		if(err){
			console.log(chalk.red(err))
		}
	})
}