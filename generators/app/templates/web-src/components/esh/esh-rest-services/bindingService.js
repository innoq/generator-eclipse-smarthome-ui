export default angular.module('esh.rest-services')
    .factory('bindingService', function ($resource) {
        return $resource('/rest/bindings', {}, {
            getAll: {
                method: 'GET',
                cache: true,
                isArray: true
            }
        });
    });