'use strict';
var util     = require('util');
var path     = require('path');
var yeoman   = require('yeoman-generator');
var chalk    = require('chalk');
var _        = require('lodash');
_.str        = require('underscore.string');
_.mixin(_.str.exports());
var shelljs  = require('shelljs/global');

var GlobeprojectGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    var self = this;

    process.stdout.write("Making sure you're running the latest version... ");

    var latestVersion = _(exec('npm view generator-globeproject version', {silent:true}).output.split('\n'))
      .filter(function(value) {
        return value.length > 0;
      })
      .last();

    var installedVersion = this.pkg.version;

    if (installedVersion === latestVersion) {
      process.stdout.write(' OK.\n');
    } else {
      process.stdout.write('\nYour generator is outdated. Please update it by running the following command in your terminal:\nsudo npm update -g generator-globeproject');
      exit(1);
    }

    function printError(library) {
      self.log(chalk.red("Looks like you didn't install " + library + ". Make sure to install all prerequisites, as detailed in " + chalk.underline.red('https://github.com/BostonGlobe/generator-globeproject#prerequisites.')));
    }

    ['hub', 'wget'].forEach(function(value) {
      if (!which(value)) {
        printError(value);
        exit(1);
      }
    });

    ['sass', 'compass', 'breakpoint'].forEach(function(value) {
      var printout = exec('gem list ' + value + ' | grep ' + value + '', {silent:true}).output;
      if (!printout.length) {
        printError(value);
        exit(1);
      }
    });

    this.on('end', function () {
      this.spawnCommand('sh', ['git.sh']);
    });
  },

  askFor: function () {
    var done = this.async();

    this.log(chalk.magenta('This generator will create a new project.'));

    var prompts = [{
      name: 'projectName',
      message: 'Enter the project name:',
      default: this.env.cwd.split('/').slice(-1)[0]
    }, {
      name: 'includeLicense',
      type: 'confirm',
      message: 'Add MIT License?',
      default: false
    }];

    this.prompt(prompts, function(props) {
      this.projectName = props.projectName;
      this.includeLicense = props.includeLicense;

      done();
    }.bind(this));

  },

  app: function () {

    this.template('_Makefile', 'Makefile');
    this.template('_README.md', 'README.md');

    this.copy('gulpfile.js');
    this.copy('.bowerrc');
    this.template('_gitignore', '.gitignore');
    this.copy('globeproject.sublime-project');
    this.copy('.jshintrc');
    this.copy('config.rb');
    this.copy('middleware.json');
    this.copy('node_modules.zip');

    if (this.includeLicense) {
      this.template('_LICENSE.md', 'LICENSE.md');
    }

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_git.sh', 'git.sh');

    this.directory('common');

    this.mkdir('data');
    this.template('data/_analysis.Rmd', 'data/' + _.slugify(this.projectName) + '.Rmd');

    this.mkdir('graphics');

    this.directory('parts');

    this.mkdir('libs');

    this.directory('node_modules');
  }
});

module.exports = GlobeprojectGenerator;