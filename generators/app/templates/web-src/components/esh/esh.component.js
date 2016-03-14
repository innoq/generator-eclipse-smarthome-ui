'use strict';

import angular from 'angular';
import restServices from './esh-rest-services/component.js';

export default angular
  .module('esh', [
    'ngResource',
    restServices.name
  ])
;
