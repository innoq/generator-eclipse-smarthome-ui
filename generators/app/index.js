'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const glob = require('glob');
const path = require('path');

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = yeoman.generators.Base.extend({

  initializing: function () {
    this.log(yosay(
      'Welcome to the incredible ' + chalk.blue('Eclipse SmartHome UI') + ' generator!'
    ));

    let targetFolderEnding = 'extensions' + path.sep + 'ui';

    if (path.resolve().indexOf(targetFolderEnding) < 0) {
      this.log(chalk.red('It does not look that you\'re in the correct ESH folder.'));
      this.log('Strg+C here and go to '+ chalk.red('extensions/ui') +' (ESH) or ' + chalk.red('addons/ui') +
        ' (OH2) to not get this msg.');
    }
    this.props = {};
    this.composeWith('eclipse-smarthome-ui:pom', {options:this.props});
  },

  subgenerators_read: function () {
    this.conflicter.force = true;
  },

  prompting: {
    promptUiNameAndAppClass: function () {
      var done = this.async();
      var prompts = [{
        type: 'input',
        name: 'uiName',
        message: 'What is the human friendly name of the new UI',
        default: 'MyUI'
      }];
      this.prompt(prompts, function(props) {
        this.props.uiName = props.uiName.replace('"', '').replace(/ui/ig, '');
        this.props.appClassName = capitalize(props.uiName).replace(/\s/g, '') + 'App';
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
    this.npmInstall(null, {cwd:'./'+this.props.bundleName});
  },

  end: function () {
    this.log('\n');
    this.log(chalk.green('Ready!') +
      ' Now let Eclipse scan your ESH root folder for new Projects. ' +
      chalk.gray('File -> Import -> Existing Projects into Workspace ...'));
  }
});
