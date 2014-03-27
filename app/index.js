'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var GlobegraphicGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    // from http://stackoverflow.com/questions/18841273/how-to-run-a-grunt-task-after-my-yeoman-generator-finishes-installing
    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies({
          callback: function () {
            this.spawnCommand('sh', ['bitbucket.sh']);
          }.bind(this) // bind the callback to the parent scope
        });
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Globegraphic generator.'));

    var prompts = [{
      name: 'graphicName',
      message: 'Enter the project name:',
      default: 'project'
    }];

    this.prompt(prompts, function(props) {
      this.graphicName = props.graphicName;

      done();
    }.bind(this));

  },

  app: function () {

    this.mkdir('parts');

    this.template('_default.html', 'parts/default.html');
    this.template('_README.md', 'README.md');
    this.copy('prod.html', 'parts/prod.html');

    this.directory('globe', 'parts/globe');
    this.directory('html');
    this.directory('css');
    this.directory('js');
    this.mkdir('js/templates');

    this.copy('gulpfile.js');
    this.copy('.bowerrc');
    this.copy('_gitignore', '.gitignore');
    this.copy('globegraphic.sublime-project');
    this.copy('config.rb');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_bitbucket.sh', 'bitbucket.sh');
  },

  projectfiles: function () {}
});

module.exports = GlobegraphicGenerator;