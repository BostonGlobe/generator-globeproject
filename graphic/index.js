'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var GraphicGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.on('end', function () {
      var baseDir = 'graphics' + '/' + this.graphicName;
      this.spawnCommand('sh', [baseDir + '/' + 'git.sh']);
    });
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
      choices: ['igraphic', 'homepage', 'article']
    },{
      when: function(response) {
        return response.graphicType === 'igraphic';
      },
      name: 'fullScreenOnMobile',
      type: 'confirm',
      message: 'Go full-screen on touch devices?',
      default: false
    }];

    this.prompt(prompts, function(props) {
      this.graphicName = props.graphicName;
      this.graphicType = props.graphicType;
      this.fullScreenOnMobile = props.fullScreenOnMobile;

      done();
    }.bind(this));

  },

  files: function () {

    var baseDir = 'graphics' + '/' + this.graphicName;

    this.mkdir(baseDir);

    this.template('_graphicType.json', baseDir + '/' + 'graphicType.json');

    var thisDir = baseDir + '/' + 'css';
    this.mkdir(thisDir);
    this.template('css/_main.scss', thisDir + '/' + 'main.scss');
    this.template('css/_layout.scss', thisDir + '/' + '_layout.scss');

    thisDir = baseDir + '/' + 'html';
    this.mkdir(thisDir);
    this.template('html/_' + this.graphicType + '.html', thisDir + '/' + 'html.html');
    this.template('html/_js.html', thisDir + '/' + 'js.html');
    this.copy('html/css.html', thisDir + '/' + 'css.html');

    thisDir = baseDir + '/' + 'js';
    this.mkdir(thisDir);
    this.copy('js/templates/blank.template', thisDir + '/' + 'templates' + '/' + 'blank.template');
    if (this.fullScreenOnMobile) {
      this.copy('js/templates/mobile.template', thisDir + '/' + 'templates' + '/' + 'mobile.template');
    }
    this.template('js/_main.js', thisDir + '/' + 'main.js');

    this.template('_template-prod.html', baseDir + '/' + 'template-prod.html');

    if (this.graphicType === 'igraphic') {
      this.template('_igraphic_regular.html', baseDir + '/' + 'template-regular.html'); 
      this.template('_igraphic_linked.html', baseDir + '/' + 'template-linked.html'); 
    } else {
      this.template('_' + this.graphicType + '.html', baseDir + '/' + 'template.html'); 
    }

    this.template('_git.sh', baseDir + '/' + 'git.sh');

    if (this.fullScreenOnMobile) {
      thisDir = 'common' + '/' + 'img';
      this.mkdir(thisDir);
      this.copy('img/b-richblack-48w.png', thisDir + '/' + 'b-richblack-48w.png');
    }

  }
});

module.exports = GraphicGenerator;