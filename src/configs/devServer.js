const path = require('path')
const { PORT } = require('../modules/constVar.js')
const {
	getCustomBundleConfig
} = require('../modules/utils')

module.exports = (appPath, env) => {
	let { devServer = {} } = getCustomBundleConfig(appPath, env)
	let serverConfig = Object.assign({
		// proxy: { },
		port: PORT,
		host: 'localhost',
		quiet: false,
		clientLogLevel: 'info',
		contentBase: path.join(appPath, 'public'), // boolean | string | array, static file location
		compress: true, // enable gzip compression
		historyApiFallback: true, // true for index.html upon 404, object for multiple paths
		hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
		https: false, // true for self-signed, object for cert authority
		noInfo: false, // only errors & warns on hot reload
	}, devServer)

	return serverConfig
}