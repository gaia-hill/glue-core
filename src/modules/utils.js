
const { ENV_PROD } = require('./constVar.js')
const path = require('path')
const fs = require('fs-extra')
const ejs = require('ejs')
const chalk = require('chalk')

const ignoreFiles = ['.DS_Store']

function getCustomWebpackConfig(appPath, env) {

	let pathDev = path.join(appPath, 'bundle/webpack.dev.js')
	let pathProd = path.join(appPath, 'bundle/webpack.prod.js')
	switch (env) {
		case ENV_PROD:
			if (fs.existsSync(pathProd)) {
				return require(pathProd)
			}
			break;
		default:
			if (fs.existsSync(pathDev)) {
				return require(pathDev)
			}
			break;
	}

	return () => null
}

function getCustomBundleConfig(appPath, env) {
	let pathBundle = path.join(appPath, 'bundle/bundle.js')
	if (fs.existsSync(pathBundle)) {
		let bundleConfig = require(pathBundle)(appPath, env)
		return bundleConfig
	}
	return {}
}

function mkdirpSync(dirPath) {
	if (!path.isAbsolute(dirPath)) {
		throw new Error('参数必须是绝对路径')

	}

	if (fs.existsSync(dirPath)) {
		if (fs.statSync(dirPath).isDirectory()) return
		console.log(chalk.red(`${dirPath} 已经存在，且不是文件夹`))
	}
	mkdirpSync(path.dirname(dirPath))
	fs.mkdirSync(dirPath, '777')
}

function writeFileWithTemplate(filePath, templatePath, data) {

	if (!path.isAbsolute(templatePath)) {
		throw new Error('参数必须是绝对路径')
	}
	if (data) {
		const file = fs.readFileSync(templatePath, 'utf8')
		const content = ejs.compile(String(file))(data)
		fs.writeFileSync(filePath, content, 'utf8')
	} else {
		fs.createReadStream(templatePath).pipe(fs.createWriteStream(filePath))
	}
}

function walkFile(dirPath, callback) {

	let stat
	try { stat = fs.statSync(dirPath) } catch (e) { return }
	if (!stat.isDirectory()) return
	fs.readdirSync(dirPath).forEach(file => {

		if (ignoreFiles.indexOf(file) >= 0) return

		const filePath = path.join(dirPath, file)
		const stat = fs.statSync(filePath)

		if (stat.isFile()) callback(filePath)
		if (stat.isDirectory()) walkFile(filePath, callback)
	})
}

module.exports = {
	getCustomWebpackConfig,
	getCustomBundleConfig,
	writeFileWithTemplate,
	walkFile,
	mkdirpSync
}