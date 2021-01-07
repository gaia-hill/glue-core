
const path = require('path')
const { ENV_DEV, ENV_PROD } = require('../constVar.js')

module.exports = (appPath, env, bundleConfig, isTs) => {
	const { babelConfig = {}, src = path.join(appPath, './src') } = bundleConfig
	const babelLoader = {
		loader: 'babel-loader',
		options: Object.assign(
			{},
			{
				babelrc: false,
				configFile: false,
				compact: env === ENV_PROD,
				cacheDirectory: true,
				cacheCompression: false,
				exclude: 'node_modules',
				include: src,
				presets: [
					require.resolve('@babel/preset-env'),
					require.resolve('@babel/preset-react'),
					isTs && require.resolve('@babel/preset-typescript')
				].filter(Boolean),
				plugins: [
					require.resolve("@babel/plugin-syntax-dynamic-import"),
					require.resolve("@babel/plugin-transform-async-to-generator"),
					require.resolve("@babel/plugin-proposal-class-properties"),
					require.resolve("@babel/plugin-transform-runtime")
				]
			},
			babelConfig
		)
	}
	return babelLoader
}