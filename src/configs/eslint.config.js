
const path = require('path')
module.exports = (appPath, bundleConfig) => {
	let {
		fix = false,
		lint = false
	} = bundleConfig
	return {
		fix,
		cwd: appPath,
		context: appPath,
		eslintPath: require.resolve('eslint'),
		formatter: require.resolve('react-dev-utils/eslintFormatter'),
		extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
		useEslintrc: false,
		lintDirtyModulesOnly: false,
		cache: true,
		cacheLocation: path.resolve(appPath, 'node_modules/.cache/.eslintcache'),
		resolvePluginsRelativeTo: path.resolve(__dirname, '../../node_modules'),
		baseConfig: {
			extends: require.resolve('eslint-config-react-app'),
			rules: {
				'no-console': 'off',
				'no-tabs': 'off',
				'indent': ['warn', 'tab'],
				'semi': ['warn', 'never'],
				'curly': 'warn'
			}
		},
		overrideConfig: typeof (lint) === 'boolean' ? {} : lint
	}
}