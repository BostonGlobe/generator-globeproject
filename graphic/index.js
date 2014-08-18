'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var GraphicGenerator = yeoman.generators.Base.extend({
  init: function () {
  },

	askFor: function () {
    var done = this.async();

    this.log(chalk.magenta('This generator will add a new graphic to your project.'));

    var prompts = [{
      name: 'graphicName',
      message: 'Enter a one-word name for this graphic:',
      default: 'graphic'
    },{
      name: 'graphicType',
      type: 'list',
      message: 'Choose the graphic type:',
      choices: ['igraphic']
    // }, {
    //   name: 'includeMobileTemplate',
    //   type: 'confirm',
    //   message: 'Go full-screen on touch devices?',
    //   default: false
    }];

    this.prompt(prompts, function(props) {
      this.graphicName = props.graphicName;
      this.graphicType = props.graphicType;

      done();
    }.bind(this));

  },

  files: function () {

    var baseDir = 'graphics' + '/' + this.graphicName;

    this.mkdir(baseDir);

    var thisDir = baseDir + '/' + 'css';
    this.mkdir(thisDir);
    this.template('css/_main.scss', thisDir + '/' + 'main.scss');
    this.copy('css/_layout.scss', thisDir + '/' + '_layout.scss');

    thisDir = baseDir + '/' + 'html';
    this.mkdir(thisDir);
    this.template('html/_html.html', thisDir + '/' + 'html.html');
    this.template('html/_js.html', thisDir + '/' + 'js.html');
    this.copy('html/css.html', thisDir + '/' + 'css.html');

    thisDir = baseDir + '/' + 'js';
    this.mkdir(thisDir);
    this.copy('js/templates/blank.template', thisDir + '/' + 'templates' + '/' + 'blank.template');
    this.template('js/_globe.graphic.js', thisDir + '/' + 'globe.graphic.js');
    this.template('js/_init.js', thisDir + '/' + 'init.js');

    this.template('_template-prod.html', baseDir + '/' + 'template-prod.html');
    this.template('_' + this.graphicType + '.html', baseDir + '/' + 'template.html'); 
  }
});

module.exports = GraphicGenerator;