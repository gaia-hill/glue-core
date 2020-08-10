
const chalk = require('chalk')

module.exports = (argv)=>{

	/**
	 * bundle help
	*/

	console.log(`
	命令：

	bundle init [projectName]    =>   初始化项目

	bundle start                 =>   启动项目

	bundle build                 =>   构建项目

	bundle help                  =>   显示帮助信息

	bundle version               =>   显示版本

	`)
}