'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const fs = require('fs-extra');
const helpers = require('yeoman-test');

describe('generator-eclipse-smarthome-ui:app', function () {

  let pomGenerator = [
    [helpers.createDummyGenerator(), 'eclipse-smarthome-ui:pom']
  ];

  const appFolder = 'test.myapp';

  before(function (done) {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withGenerators(pomGenerator)
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, 'parent-pom.xml'), path.join(dir, 'pom.xml'));
      })
      .withPrompts({uiName: 'My New UI', bundleName: appFolder, uiPath: '/test'})
      .toPromise()
      .then(function (dir) {
        console.log('Generator temp directory: ', dir);
        done();
      }, done);
  });

  describe('creates', function () {

    it('target app folder', function () {
      assert.file(appFolder);
    });

    it('dot files', function () {
      assert.file([
        appFolder + '/.classpath',
        appFolder + '/.project',
        appFolder + '/.gitignore',
        appFolder + '/.editorconfig'
      ]);
    });

    it('OSGi files', function () {
      assert.file([
        appFolder + '/OSGI-INF/myapp.xml',
        appFolder + '/META-INF/MANIFEST.MF'
      ]);
      assert.fileContent(appFolder + '/.project', /<name>test\.myapp</);
    });

    it('has a package.json', function () {
      assert.jsonFileContent(appFolder + '/package.json', {name: 'test.myapp'});
    });

    it('a java file', function () {
      let servletPath = appFolder + '/src/main/java/test/myapp/internal/';
      let files = fs.readdirSync(servletPath);
      try {
        assert.file(servletPath + '/MyNewUIApp.java');
      } catch (err) {
        console.log('Files found: ' + files, err);
        throw err;
      }
      assert.fileContent(servletPath + '/MyNewUIApp.java', 'package test.myapp.internal;');
    });


  });


});
