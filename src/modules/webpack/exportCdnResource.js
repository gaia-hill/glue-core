
var path = require("path")
var fs = require("fs")
const {
	getCustomBundleConfig
} = require('../utils')

module.exports = (appPath, env) => {

	let {
		dist = path.join(appPath, './dist')
	} = getCustomBundleConfig(appPath, env)

	return function () {
		this.plugin("done", function (stats) {
			var statsJson = stats.toJson()
			var chunkName = statsJson.assetsByChunkName

			var result = {};
			for (var key in chunkName) {
				var sourceMapping = chunkName[key];
				sourceMapping = [].concat(sourceMapping)
				sourceMapping.forEach && (
					sourceMapping.forEach(function (a) {
						var extname = path.extname(a);
						var arr = a.split(".");
						arr.pop();
						arr.pop();
						arr.push(extname)
						var name = "/" + arr.join("");
						result[name] = "/" + a;
					})
				)
			}

			const iniContent = []
			for (var i in result) {
				iniContent.push(`${i}=${result[i]}`)
			}
			try {
				fs.writeFileSync(
					path.join(dist, "cdnResource.json"),
					JSON.stringify(result));
				fs.writeFileSync(
					path.join(dist, "cdnResource.ini"),
					iniContent.join("\n"));
			} catch (e) {
				console.error(e)
			}
		})
	}
}
