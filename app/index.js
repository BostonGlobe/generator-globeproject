'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');


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
    }, {
      name: 'includeSass',
      type: 'confirm',
      message: 'Include Sass?',
      default: false
    }, {
      when: function(response) {
        return response.includeSass;
      },
      name: 'includeCompass',
      type: 'confirm',
      message: 'Include Compass?',
      default: false
    }, {
      when: function(response) {
        return response.includeCompass;
      },
      name: 'compassPlugins',
      type: 'checkbox',
      message: 'Select Compass plugins:',
      choices: [{
        name: 'Breakpoint'
      }, {
        name: 'Vertical Rhythm'
      }]
    }];

    this.prompt(prompts, function(props) {
      this.graphicName = props.graphicName;
      this.includeSass = props.includeSass;
      this.includeCompass = props.includeCompass;
      this.includeBreakpoint = _.contains(props.compassPlugins, 'Breakpoint');
      this.includeVerticalRhythm = _.contains(props.compassPlugins, 'Vertical Rhythm');

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

    this.mkdir('css');

    if (this.includeSass) {
      this.template('css/_boilerplate-common.scss');
      this.template('css/_boilerplate-igraphic.scss');
      this.copy('css/_layout.scss');
      this.copy('css/_type.scss');
      this.template('css/main.scss');
    } else {
      this.copy('css/boilerplate-common.css');
      this.copy('css/boilerplate-igraphic.css');
      this.copy('css/_layout.scss', 'css/layout.css');
    }

    this.directory('js');
    this.mkdir('js/templates');

    this.copy('gulpfile.js');
    this.copy('.bowerrc');
    this.copy('_gitignore', '.gitignore');
    this.copy('globegraphic.sublime-project');

    if (this.includeCompass) {
      this.template('_config.rb', 'config.rb');
    }

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_bitbucket.sh', 'bitbucket.sh');
  },

  projectfiles: function () {}
});

module.exports = GlobegraphicGenerator;