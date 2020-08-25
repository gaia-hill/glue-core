
const devWebpackConfig = require('../../configs/devWebpackConfig.js')
const prodWebpackConfig = require('../../configs/prodWebpackConfig.js')
const {ENV_PROD, ENV_DEV} = require('../constVar.js')

module.exports =  (appPath, env, bundleConfig)=>{
	switch (env) {
		case ENV_PROD:
			return prodWebpackConfig(appPath, bundleConfig)
		case ENV_DEV:
			return devWebpackConfig(appPath, bundleConfig)
		default:
			return devWebpackConfig(appPath, bundleConfig)
	}
}