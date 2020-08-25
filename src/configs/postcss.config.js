const Autoprefixer = require('autoprefixer')

module.exports = ({ file, options, env }) => ({
	sourceMap: env === 'development',
	plugins: [Autoprefixer]
})