'use strict';

const angular = require('angular');
require('angular-touch');
require('angular-resource');
require('angular-route');

angular
  .module('eshUiApp', [
    'ngRoute',
    'ngResource',
    'ngTouch',
    require('./app-routes').name,
    require('./app-constants').name,
    require('../components/pages/').name
  ])

  .run(($log) => {

    $log.info('Application has started.');

  });
