
const path = require('path')

module.exports = async (argv) => {

	/**
	 * glue version
	*/
	const packageInfo = require(path.join(__dirname, '../../package.json'))
	console.log(packageInfo.version)
}