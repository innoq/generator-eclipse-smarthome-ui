'use strict';

const angular = require('angular');

const MODULE_ID = 'colorPicker';
export {MODULE_ID as name};

angular
  .module(MODULE_ID, [
    require('../esh').name
  ])
  .directive('colorPicker', require('./ColorPickerComponent.js').default)
  .factory('colorUtils', require('./ColorUtils.js').default);




