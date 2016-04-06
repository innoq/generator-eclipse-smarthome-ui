'use strict';

const angular = require('angular');
const restServices = require('./esh-rest-services/component.js');

module.exports = angular
  .module('esh', [
    'ngResource',
    restServices.name
  ])
;
