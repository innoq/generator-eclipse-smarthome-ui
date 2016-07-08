'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-generator').test;
const fs = require('fs-extra');

describe('generator-eclipse-smarthome-ui:pom', () => {

  let src = path.join(__dirname, 'parent-pom.xml');
  let dest = path.join(__dirname, 'pom.xml');

  before('generate should be error free', (done) => {
    helpers
      .run(path.join(__dirname, '../generators/pom'))
      .inTmpDir((dir) => {
        fs.copySync(src, dir + '/pom.xml');
      })
      .withOptions({bundleName: 'abc'})
      .on('end', done);
  });

  it('creates module entry', () => {

    it('should contain the new module', () => {
      assert.fileContent(dest, /<module>abc</);
    });

  });

});
