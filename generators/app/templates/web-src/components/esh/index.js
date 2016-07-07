'use strict';

const angular = require('angular');

const MODULE_ID = 'esh';
export {MODULE_ID as name};

angular.module(MODULE_ID, [
  'ngResource',
  require('./esh-rest-services').name
]);

