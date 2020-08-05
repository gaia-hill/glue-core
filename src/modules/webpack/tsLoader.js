const path = require('path')
const fs = require('fs-extra')
const {
	getCustomBundleConfig
} = require('../utils')

module.exports = (appPath, env) => {
	let {
		tsConfigPath = path.join(appPath, './tsconfig.json')
	} = getCustomBundleConfig(appPath, env)

	if (!fs.existsSync(tsConfigPath)) {
		tsConfigPath = path.join(__dirname, '../../configs/tsconfig.json')
	}
	const babelLoader = {
		loader: 'ts-loader',
		options: {
			context: appPath,
			configFile: tsConfigPath
		}
	}
	return babelLoader
}