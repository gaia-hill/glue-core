
/**
 * @description glue配置文件
 * @date  <%= createdAt %>
 */

const path = require('path')

module.exports = function (appPath, env) {
	return {
		title: '<%= projectName %>',  //  页面标题
		hash: true,                   //  构建时是否添加hash
		favicon: '',                  //  页面图标
		html: true,                   //  是否生成html文件
		template: undefined,          //  模板路径
		entry: {                      //  页面入口文件，默认{ index: path.join(appPath, './src/index.js') }
			index: path.join(appPath, './src/index.js')
		},
		src: path.join(appPath, './src'),    //  项目源码目录
		dist: path.join(appPath, './dist'),  //  项目构建输出目录
		babelConfig: {},			  //  babel配置，参考babel文档
		fix: false,                   //  是否自动修复eslint问题
		lint: false,                  //  是否开启eslint，true或者{...eslintOptions}
		devServer: {                  //  dev-server文档，参考webpack文档中的配置
			port: 9999
		}
	}
}
