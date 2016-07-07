const angular = require('angular');

const MODULE_ID = 'itemSelector';
export {MODULE_ID as name};

angular
  .module(MODULE_ID, [
    require('../esh').name
  ])
  .directive('itemSelector', require('./ItemSelectorComponent.js').default)
;
