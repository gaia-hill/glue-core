
const cssLoaderConfig = require('./cssLoaderConfig.js')
const babelLoader = require('./babelLoader.js')

module.exports = (appPath, env) => {
	const loaders = [
		{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					js: [babelLoader(appPath, env)],
					...cssLoaderConfig(appPath, env)
				}
			}
		}
	]

	return loaders
}