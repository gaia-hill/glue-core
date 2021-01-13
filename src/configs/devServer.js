const path = require('path')
const { PORT } = require('../modules/constVar.js')

module.exports = (appPath, env, bundleConfig) => {
	let { devServer = {} } = bundleConfig
	let serverConfig = Object.assign({
		// proxy: { },
		port: PORT,
		host: '0.0.0.0',
		quiet: false,
		clientLogLevel: 'info',
		contentBase: path.join(appPath, 'public'),
		compress: false,
		historyApiFallback: false,
		hot: true,
		https: false,
		noInfo: true,
		inline: true,
		stats: {
			cached: true,
			colors: true
		},
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
		}
	}, devServer)

	return serverConfig
}