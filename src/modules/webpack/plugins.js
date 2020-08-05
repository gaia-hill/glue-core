const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExportCDNResource = require('./exportCdnResource.js')
const {
	getCustomBundleConfig
} = require('../utils')
const { ENV_DEV, ENV_PROD } = require('../constVar.js')

module.exports = (appPath, env) => {
	let {
		hash = true,
		favicon = '',
		title = 'fe-bundle',
		template,
	} = getCustomBundleConfig(appPath, env)
	const plugins = [
		// 提取css到单独文件，只在生产环境生效
		env === ENV_PROD && new MiniCssExtractPlugin({
			filename: hash ? 'css/[name].[contenthash].css' : 'css/[name].css',
			allChunks: false,
			ignoreOrder: true
		}),

		new VueLoaderPlugin(),

		env === ENV_DEV && new webpack.HotModuleReplacementPlugin(),

		// 通过模板生成HTML文件
		new HtmlWebpackPlugin({
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
		new ProgressBarWebpackPlugin({
			format: `${chalk.cyan('build')} ${chalk.blue('[:bar]')} ${chalk.cyan(':percent')}`,
			complete: '>',
			incomplete: '·',
			clear: false,
		}),

		env === ENV_PROD && ExportCDNResource(appPath, env)

	].filter(plugin => plugin)

	return plugins
}