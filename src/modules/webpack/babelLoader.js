
const path = require('path')

module.exports = (appPath, env, bundleConfig) => {
	const { babelConfig = {}, src = path.join(appPath, './src') } = bundleConfig
	const babelLoader = {
		loader: 'babel-loader',
		options: Object.assign(
			{},
			{
				babelrc: false,
			    compact: true,
				cacheDirectory: true,
				// exclude: path.join(appPath, './node_modules'),
				include: src,
				presets: [
					[require.resolve('@babel/preset-env'), {useBuiltIns: 'usage', corejs: 3}],
					require.resolve('@babel/preset-react')
				],
				plugins: [
					require.resolve("@babel/plugin-syntax-dynamic-import"),
					require.resolve("@babel/plugin-transform-async-to-generator"),
					[require.resolve("@babel/plugin-proposal-class-properties"), { "loose": false }],

					[require.resolve('babel-plugin-import'), {
						'libraryName': 'antd',
						'style': true
					}, 'antd'],
					[require.resolve('babel-plugin-import'), {
						'libraryName': 'ant-mobile',
						'style': 'css'
					}, 'ant-mobile'],
					require.resolve("@babel/plugin-transform-runtime")
				]
			},
			babelConfig
		)
	}
	return babelLoader
}