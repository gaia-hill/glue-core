
const {
	getCustomBundleConfig
} = require('../utils')

module.exports = (appPath, env) => {
	const { babelConfig = {} } = getCustomBundleConfig(appPath, env)
	const babelLoader = {
		loader: 'babel-loader',
		options: Object.assign(
			{},
			{
				presets: [
					require.resolve('@babel/preset-env'),
					require.resolve('@babel/preset-react')
				],
				plugins: [

				]
			},
			babelConfig
		)
	}
	return babelLoader
}