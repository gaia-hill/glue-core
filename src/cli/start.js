const getWebpackConfig = require('../modules/webpack')
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const { ENV_DEV } = require('../modules/constVar.js')

const getDevServerConfig = require('../configs/devServer.js')

module.exports = (argv) => {
	const configs = getWebpackConfig(argv.cwd, ENV_DEV)
	const devServerConfig = getDevServerConfig(argv.cwd, ENV_DEV)
	const compiler = webpack(configs)
	const server = new DevServer(compiler, devServerConfig)
	server.listen(devServerConfig.port, devServerConfig.host, (err, result) => {
		if (err) {
			console.log(err)
			return
		}
	})
}