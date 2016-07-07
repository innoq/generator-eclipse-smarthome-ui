'use strict';

import angular from 'angular';
import DemoPageConfig from './DemoPage.js';

const MODULE_ID = 'pages';
export {MODULE_ID as name};

angular
  .module(MODULE_ID, [
    require('../colorPicker').name,
    require('../itemSelector').name
  ])
  .config(DemoPageConfig);
