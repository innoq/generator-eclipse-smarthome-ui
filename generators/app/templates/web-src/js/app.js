'use strict';

import angular from 'angular';
import 'angular-touch';
import 'angular-resource';
import pages from '../components/pages/component.js';
import colorPicker from '../components/colorPicker/component.js';

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
