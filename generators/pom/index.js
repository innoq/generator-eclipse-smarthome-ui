'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;

module.exports = yeoman.generators.Base.extend({

  initializing: function pomInitializing() {
    this.conflicter.force = true;
  },

  install: function pomInstall() {
    if (!this.options || !this.options.bundleName) {
      this.log('Internal Error: Did not found parameter from parent generator!');
      return false;
    }

    if (!this.fs.exists('pom.xml')) {
      this.log(chalk.yellow('No parent pom.xml found, not modifyfing that.'));
      return;
    }
    var pomString = this.fs.read('pom.xml');
    var pom = new DOMParser().parseFromString(pomString);
    var modules = pom.getElementsByTagName('modules');
    if (modules.length !== 1) {
      this.log('Found pom.xml, but it may contain more than one modules node. Strange!');
    } else {
      var uiModule = pom.createElement('module');
      uiModule.textContent = this.options.bundleName;
      modules[0].appendChild(uiModule);
    }
    var serializer = new XMLSerializer();
    this.fs.write('pom.xml', serializer.serializeToString(pom));
    this.log('Added module to pom.xml.');
  }

});
