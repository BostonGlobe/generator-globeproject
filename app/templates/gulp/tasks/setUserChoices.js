var gulp           = require('gulp');
var inquirer       = require('inquirer');
var fs             = require('fs');
var getDirectories = require('../util/getDirectories');
var config         = require('../config');

gulp.task('set-user-choices', function(done) {

	var prompts = [{
		type: 'confirm',
		name: 'packageToJPT',
		message: 'Do you want to package to JPT?',
		default: false
	}];

	var graphicChoices = getDirectories('graphics');

	if (graphicChoices.length > 1) {
		prompts.unshift({
			type: 'list',
			name: 'graphicName',
			message: 'Choose a graphic',
			choices: graphicChoices
		});
	}

	inquirer.prompt(prompts, function(answers) {

		var chosenGraphic = answers.graphicName || graphicChoices[0];
		var graphicType = JSON.parse(fs.readFileSync('graphics/' + chosenGraphic + '/graphicType.json', {encoding: 'utf8'})).graphicType;

		if (!answers.packageToJPT && graphicType === 'igraphic') {

			// ask what kind of template we want
			inquirer.prompt([{
				type: 'list',
				name: 'igraphicType',
				message: 'Choose an igraphic template',
				choices: ['regular', 'linked']	
			}], function(answers) {

				config.setUserChoice('graphic', chosenGraphic);
				config.setUserChoice('graphicTemplate', '-' + answers.igraphicType);
				done();

			});
		} else {

			config.setUserChoice('graphic', chosenGraphic);
			config.setUserChoice('packageToJpt', answers.packageToJPT);
			config.setUserChoice('graphicTemplate', '');
			done();
		}

	});

});