const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const happypackConfig = require('./happypack.js');
const ExportCDNResource = require('./exportCdnResource.js')
const { ENV_DEV, ENV_PROD } = require('../constVar.js')

module.exports = (appPath, env, bundleConfig) => {
	let {
		hash = true,
		favicon = '',
		title = 'fe-bundle',
		htmlFile = true,
		vue = false,
		template,
		happypack = false
	} = bundleConfig

	const happypackPlugins = happypack ? happypackConfig(appPath, env, bundleConfig) : []
	const plugins = [

		...happypackPlugins,

		// 提取css到单独文件，只在生产环境生效
		env === ENV_PROD && new MiniCssExtractPlugin({
			filename: hash ? 'css/[name].[contenthash].css' : 'css/[name].css',
			allChunks: false,
			ignoreOrder: true
		}),

		vue && new VueLoaderPlugin(),

		// 通过模板生成HTML文件
		htmlFile && new HtmlWebpackPlugin({
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
		new ProgressBarWebpackPlugin(),

		env === ENV_PROD && ExportCDNResource(appPath, env, bundleConfig)

	].filter(plugin => plugin)

	return plugins
}