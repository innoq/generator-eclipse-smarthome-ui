import angular from 'angular';

const MODULE_ID = 'appRoutes';
export {MODULE_ID as name};

angular
  .module(MODULE_ID, [])
  .config(($routeProvider) => {

    $routeProvider.otherwise({
      redirectTo: '/colorPicker'
    });

  });
