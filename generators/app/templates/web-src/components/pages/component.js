'use strict';

import angular from 'angular';
import pageDemo from './pageDemo.js';

export default angular
  .module('pages', [
    pageDemo.name
  ])
;
