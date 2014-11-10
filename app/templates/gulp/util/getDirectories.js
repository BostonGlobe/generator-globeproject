var fs = require('fs');

module.exports = function (baseDir) {
	return fs.readdirSync(baseDir).filter(function (file) {
		return fs.statSync(baseDir + '/' + file).isDirectory();
	});
};