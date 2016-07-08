'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const fs = require('fs-extra');
const helpers = require('yeoman-test');

describe('generator-eclipse-smarthome-ui:app', function () {

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, 'parent-pom.xml'), path.join(dir, 'pom.xml'));
      })
      .withPrompts({uiName: 'My New UI', bundleName: 'test.myapp', uiPath: '/test'})
      .toPromise();
  });

  describe('creates', function () {

    it('dot files', function () {
      assert.file([
        'test.myapp/.classpath',
        'test.myapp/.project',
        'test.myapp/.gitignore'
      ]);
      assert.fileContent('test.myapp/.project', /<name>test\.myapp</);
    });

    it('a java file', function () {
      assert.file('test.myapp/src/main/java/test/myapp/internal/MyNewApp.java');
    });

    it('an osgi-inf config xml', function () {
      assert.file('test.myapp/OSGI-INF/myapp.xml');
    });


  });


});
