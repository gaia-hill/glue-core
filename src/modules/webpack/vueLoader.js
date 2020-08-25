
const cssLoaderConfig = require('./cssLoaderConfig.js')
const babelLoader = require('./babelLoader.js')

module.exports = (appPath, env, bundleConfig) => {
	const loaders = [
		{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					js: [babelLoader(appPath, env, bundleConfig)],
					...cssLoaderConfig(appPath, env)
				}
			}
		}
	]

	return loaders
}