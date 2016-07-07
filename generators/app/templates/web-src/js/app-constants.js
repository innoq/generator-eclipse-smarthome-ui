import angular from 'angular';

const MODULE_ID = 'appConstants';
export {MODULE_ID as name};

angular
  .module(MODULE_ID, [])
  .constant('MY_NAME_IS', '<%= bundleName %>')
;
