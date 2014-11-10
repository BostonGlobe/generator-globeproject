module.exports = (function() {

	function privateSetChoice(key, value) {
		global[key] = value;
	}

	function privateGetChoice(key) {
		return global[key];
	}

	return {
		setUserChoice: privateSetChoice,
		getUserChoice: privateGetChoice,

		html: function(isProd) {
			return {
				dev: 'template' + privateGetChoice('graphicTemplate') + '.html',
				prod: 'template-prod.html'
			}[isProd ? 'prod' : 'dev'];
		},

		baseDir: function() {
			return 'graphics/' + privateGetChoice('graphic');
		}
	};

})();