const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const happypackConfig = require('./happypack.js');
const ExportCDNResource = require('./exportCdnResource.js')
const { handlerProgress } = require('../utils.js')
const eslintConfig = require('../../configs/eslint.config.js')
const { ENV_DEV, ENV_PROD } = require('../constVar.js')

module.exports = (appPath, env, bundleConfig) => {
	let {
		hash = true,
		favicon = false,
		title = 'fe-bundle',
		html = true,
		template,
		happypack = false,
		src = path.join(appPath, './src'),
		lint = false
	} = bundleConfig

	const happypackPlugins = happypack ? happypackConfig(appPath, env, bundleConfig) : []
	const plugins = [

		env === ENV_DEV && lint && new ESLintPlugin(eslintConfig(appPath, bundleConfig)),

		...(happypack ? happypackPlugins : {}),

		// 提取css到单独文件，只在生产环境生效
		env === ENV_PROD && new MiniCssExtractPlugin({
			filename: hash ? 'css/[name].[contenthash].css' : 'css/[name].css',
			allChunks: false,
			ignoreOrder: true
		}),

		// 通过模板生成HTML文件
		html && new HtmlWebpackPlugin({
			chunksSortMode: 'none',
			title,
			favicon,
			hash: false,
			inject: false,
			appMountId: 'root',
			ENV: env,
			filename: 'index.html',
			template: fs.existsSync(template) ? template : path.join(__dirname, '../index.ejs')
		}),

		// 显示构建的进度
		new webpack.ProgressPlugin(handlerProgress()),

		env === ENV_PROD && hash && new ExportCDNResource({ appPath, env, bundleConfig })

	].filter(plugin => plugin)

	return plugins
}

