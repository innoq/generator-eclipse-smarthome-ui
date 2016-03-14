'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require('glob');
var DOMParser = require('xmldom').DOMParser;
var XMLSerializer = require('xmldom').XMLSerializer;

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.conflicter.force = true;
    this.log(yosay(
      'Welcome to the incredible ' + chalk.blue('Eclipse SmartHome UI') + ' generator!'
    ));

    if (this.appname !== 'ui') {
      this.log(chalk.red('It does not look that you\'re in the correct ESH folder.'));
      this.log('Strg+C here and go to '+ chalk.red('extensions/ui') +' (ESH) or ' + chalk.red('addons/ui') +
        ' (OH2) to not get this msg.');
    }
  },

  prompting: {
    promptUiNameAndAppClass: function UiNameAndAppClass() {
      var done = this.async();
      var prompts = [{
        type: 'input',
        name: 'uiName',
        message: 'What is the human friendly name of the new UI',
        default: 'MyUI'
      }];
      this.prompt(prompts, function(props) {
        props.uiName = props.uiName.replace('"', '').replace(/ui/ig, '');
        props.appClassName = capitalize(props.uiName).replace(/\s/g, '') + 'App';
        this.props = props;
        done();
      }.bind(this));
    },

    promptBundleName: function BundleName() {
      var done = this.async();
      var prompts = [{
          type: 'input',
          name: 'bundleName',
          message: 'Whats the package name of the new UI?',
          default: 'org.eclipse.smarthome.ui.' + this.props.uiName.toLowerCase().replace(/\s/g, '')
      }];

      this.prompt(prompts, function(props) {
        this.props.bundleName = props.bundleName;
        done();
      }.bind(this));

    },

    promptUiPath: function () {
      var done = this.async();
      var bundleName = this.props.bundleName;
      var uiPathDefault = '/' + bundleName.substr(bundleName.lastIndexOf('.') + 1);

      var prompts = [{
        type: 'input',
        name: 'uiPath',
        message: 'What URL path should the UI be accessible on? (Just one path level)',
        default: uiPathDefault
      }];

      this.prompt(prompts, function(props) {
        this.props.uiPath = props.uiPath.replace(/^\//, '');
        done();
      }.bind(this));

    }
  },

  writing: function () {
    var tplPath = this.templatePath();
    this.fs.copyTpl(
      glob.sync(tplPath + '/**', {dot: true, ignore: '**/.DS_Store'}),
      this.destinationPath(this.props.bundleName),
      this.props
    );

    var servletPath = this.props.bundleName + '/src/main/java/MyApp.java';
    var servletDestinationPath = this.props.bundleName +
      '/src/main/java/' +
      this.props.bundleName.replace(/\./g, '/') +
      '/internal/' + this.props.appClassName + '.java';

    // Rename MyApp.java
    if (this.fs.exists(this.destinationPath(servletPath))) {
      this.fs.move(
        this.destinationPath(servletPath),
        this.destinationPath(servletDestinationPath)
      );
    }

    // Rename myapp.xml
    var myappxml = this.props.bundleName + 'OSGI-INF/myapp.xml';
    var myappxmlDestination = this.props.bundleName + 'OSGI-INF/' + this.props.appClassName.toLowerCase() + '.xml';
    if (this.fs.exists(this.destinationPath(myappxml))) {
      this.fs.move(
        this.destinationPath(myappxml),
        this.destinationPath(myappxmlDestination)
      );
    }

  },

  install: function () {
    process.chdir(this.props.bundleName);
    this.npmInstall();
    process.chdir('..');


    if (!this.fs.exists('pom.xml')) {
      this.log(chalk.yellow('No parent pom.xml found, not modifiefing that.'));
      return;
    }
    var pomString = this.fs.read('pom.xml');
    var pom = new DOMParser().parseFromString(pomString);
    var modules = pom.getElementsByTagName('modules');
    if (modules.length !== 1) {
      this.log('Found pom.xml, but it may contain more than one modules node. Strange!');
    } else {
      var uiModule = pom.createElement('module');
      uiModule.textContent = this.props.bundleName;
      modules[0].appendChild(uiModule);
    }
    var serializer = new XMLSerializer();
    this.fs.write('pom.xml', serializer.serializeToString(pom));
    this.log('Added module to pom.xml.');
  },

  end: function () {
    this.log('\n');
    this.log(chalk.green('Ready!') +
      ' Now let Eclipse scan your ESH root folder for new Projects. ' +
      chalk.gray('File -> Import -> Existing Projects into Workspace ...'));
  }
});
