/**
 * @description glue配置文件
 * @date  <%= createdAt %>
 */

const path = require('path')

module.exports = function (appPath, env) {
	return {
		title: '<%= projectName %>',  //  页面标题
		vue: false,                   //  是否支持vue
		hash: true,                   //  构建时是否添加hash
		favicon: '',                  //  页面图标
		htmlFile: true,              //  是否生成html文件
		template: undefined,          //  模板路径
		happypack: false,             //  是否启用happypack
		entry: {                      //  页面入口文件，默认{ index: path.join(appPath, './src/index.js') }
			index: path.join(appPath, './src/index.js')
		},
		src: path.join(appPath, './src'),    //  项目源码目录
		dist: path.join(appPath, './dist'),  //  项目构建输出目录
		babelConfig: {},              //  babel配置，参考babel文档
		devServer: {                  //  dev-server文档，参考webpack文档中的配置
			port: 9998
		}
	}
}
