'use strict';

const angular = require('angular');
require('angular-touch');
require('angular-resource');
const pages = require('../components/pages/component.js');
const colorPicker = require('../components/colorPicker/component.js');

angular
  .module('eshUiApp', [
    'ngRoute',
    'ngResource',
    pages.name,
    colorPicker.name
  ])

  .run(($log) => {

    $log.info('Application has started.');

  });
