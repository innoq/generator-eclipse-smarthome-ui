const path = require('path');
const assert = require('yeoman-assert');
const fs = require('fs');
const helpers = require('yeoman-generator').test;

describe('generator-eclipse-smarthome-ui:app', function () {

  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
    // TODO: Does not work, hangs on requiring fs-extra above
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, 'parent-pom.xml'), path.join(dir, 'pom.xml'));
      })
      .withPrompts({uiName: 'My New UI', bundleName: 'test.myapp', uiPath: '/test'})
      .on('end', done);
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
