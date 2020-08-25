
const HappyPack = require('happypack')
const os = require('os')

const getBabelLoader = require('./babelLoader.js')
const getTsLoader = require('./tsLoader.js')

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 })

module.exports = (appPath, env, bundleConfig) => {
	const happypackConfig = [
		new HappyPack({
			loaders: [getBabelLoader(appPath, env, bundleConfig)],
			threadPool: happyThreadPool,
			id: 'babel'
		}),
		new HappyPack({
			loaders: [getBabelLoader(appPath, env, bundleConfig), getTsLoader(appPath, env, bundleConfig)],
			threadPool: happyThreadPool,
			id: 'ts'
		}),
	]

	return happypackConfig
}