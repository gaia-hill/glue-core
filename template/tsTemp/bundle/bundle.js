/**
 * @description glue配置文件
 * @date  <%= createdAt %>
 */

const path = require('path')

module.exports = function (appPath, env) {
	return {
		entry: {
			index: path.join(appPath, './src/index.js')
		},
		dist: path.join(appPath, './dist'),
		hash: true,
		favicon: '',
		title: '<%= projectName %>',
		template: '',
		hot: false,
		// tsConfigPath: path.join(appPath, './tsconfig.json'),
		// babelConfig: {},
		// devServer: {
		// 	port: 9998
		// }
	}
}
