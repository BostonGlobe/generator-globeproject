'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');


var GlobegraphicGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.spawnCommand('sh', ['bitbucket.sh']);
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
      default: this.env.cwd.split('/').slice(-1)[0]
    }, {
      name: 'includeMobileTemplate',
      type: 'confirm',
      message: 'Go full-screen on touch devices?',
      default: false
    }, {
      name: 'includeLicense',
      type: 'confirm',
      message: 'Add MIT License?',
      default: false
    }];

    this.prompt(prompts, function(props) {
      this.graphicName = props.graphicName;
      this.includeMobileTemplate = props.includeMobileTemplate;
      this.includeLicense = props.includeLicense;

      done();
    }.bind(this));

  },

  app: function () {

    this.template('_Makefile', 'Makefile');

    this.template('_README.md', 'README.md');

    this.directory('html');
    this.directory('parts');

    this.template('_standalone.html', 'parts/standalone.html');

    this.mkdir('css');
    this.mkdir('data');

    this.template('css/_boilerplate-common.scss');
    this.template('css/_boilerplate-igraphic.scss');
    this.copy('css/_layout.scss');
    this.copy('css/_type.scss');
    this.copy('css/homepage.template');
    this.copy('css/standalone.template');

    this.mkdir('js');
    this.mkdir('js/templates');

    this.copy('js/globe.graphicLogSource.js');
    this.copy('js/init.js');
    this.template('js/_globe.graphic.js', 'js/globe.graphic.js');

    if (this.includeMobileTemplate) {
      this.copy('css/_touch.scss');
      this.copy('js/globe.graphicMobile.js');
      this.copy('js/templates/mobile.template');

      this.mkdir('img');
      this.copy('img/b-richblack-48w.png');
    }

    this.copy('gulpfile.js');
    this.copy('.bowerrc');
    this.template('_gitignore', '.gitignore');
    this.copy('globegraphic.sublime-project');
    this.copy('.jshintignore');
    this.copy('.jshintrc');
    this.copy('config.rb');

    if (this.includeLicense) {
      this.template('_LICENSE.md', 'LICENSE.md');
    }

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_bitbucket.sh', 'bitbucket.sh');
  },

  projectfiles: function () {}
});

module.exports = GlobegraphicGenerator;