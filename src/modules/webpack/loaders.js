const { ENV_PROD } = require('../constVar.js')

const getCssLoader = require('./cssLoader.js')
const getBabelLoader = require('./babelLoader.js')

module.exports = (appPath, env, bundleConfig) => {
	let {
		hash = true,
		happypack = false
	} = bundleConfig
	const loaders = [
		{
			test: /\.(js|mjs|jsx)$/,
			use: happypack ? 'happypack/loader?id=babel' : [getBabelLoader(appPath, env, bundleConfig, false)]
		},
		{
			test: /\.(ts|tsx)$/,
			use: happypack ? 'happypack/loader?id=ts' : [getBabelLoader(appPath, env, bundleConfig, true)]
		},
		...getCssLoader(appPath, env),
		{
			test: /\.(png|jpe?g|gif)$/i,
			use: [
				{
					loader: 'file-loader', options: {
						name: env === ENV_PROD && hash ? '[name].[ext]' : '[name].[contenthash].[ext]'
					}
				},
			],
		}
	].filter(loader => loader)

	return loaders
}