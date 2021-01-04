
const path = require('path')
module.exports = (appPath, bundleConfig) => {
	let {
		vue = false,
		src = path.join(appPath, './src'),
		fix = false,
		lint = false
	} = bundleConfig
	return {
		fix,
		cwd: src,
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
		useEslintrc: false,
		lintDirtyModulesOnly: false,
		resolvePluginsRelativeTo: path.resolve(__dirname, '../../node_modules'),
		baseConfig: {
			// plugins: ['import', 'react', 'react-hooks', 'jsx-a11y'],
			extends: vue ? require.resolve('eslint-config-vue') : require.resolve('eslint-config-airbnb'),
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