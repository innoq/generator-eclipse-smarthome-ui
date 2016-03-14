'use strict';

import angular from 'angular';

// TODO Split this up to pageDemo.html
export default angular
  .module('pages')
  .config(($routeProvider) => {
    $routeProvider.when('/colorPicker', {
      template: '<color-picker item="colorItem"></color-picker>',
      controller: ($scope, $log) => {
        $log.warn('Created a fake color item.');
        $scope.colorItem = {
          state: '0,100,50',
          name: 'myFakeColorItem',
          label: 'My Fake Color Item'
        }
      }
    })
  })
  .directive('colorPicker', [])
;
