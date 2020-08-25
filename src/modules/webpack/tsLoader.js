const path = require('path')
const fs = require('fs-extra')

module.exports = (appPath, env, bundleConfig) => {
	let {
		tsConfigPath = path.join(appPath, './tsconfig.json')
	} = bundleConfig

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