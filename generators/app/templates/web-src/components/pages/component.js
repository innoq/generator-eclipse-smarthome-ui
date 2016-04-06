'use strict';

import angular from 'angular';
import pageDemo from './pageDemo.js';

module.exports = angular
  .module('pages', [
    pageDemo.name
  ])
;
