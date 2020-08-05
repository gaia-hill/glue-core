
const cssLoaderConfig = require('./cssLoaderConfig.js')

module.exports = (appPath, env) => {

	const loaders = [
		{
			test: /\.css$/,
			use: cssLoaderConfig(appPath, env).css
		},
		{
			test: /\.styl$/,
			use: cssLoaderConfig(appPath, env).stylus
		},
		{
			test: /\.less$/,
			use: cssLoaderConfig(appPath, env).less
		},
		{
			test: /\.(sass|scss)$/,
			use: cssLoaderConfig(appPath, env).sass
		}
	]

	return loaders
}