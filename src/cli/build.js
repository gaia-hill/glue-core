const getWebpackConfig = require('../modules/webpack')
const webpack = require('webpack')
const {ENV_PROD} = require('../modules/constVar.js')
const chalk = require('chalk')

module.exports = (argv)=>{
	const configs = getWebpackConfig(argv.cwd, ENV_PROD)
	const compiler = webpack(configs, (err, stat) => {
		if(err){
			console.log(chalk.red(err))
		}
	})
}