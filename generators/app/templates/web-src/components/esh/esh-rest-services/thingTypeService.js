export default angular.module('esh.rest-services')

    .factory('thingTypeService', function ($resource) {
        return $resource('/rest/thing-types', {}, {
            getAll: {
                method: 'GET',
                isArray: true
            },
            getByUid: {
                method: 'GET',
                params: {
                    bindingId: '@thingTypeUID'
                },
                url: '/rest/thing-types/:thingTypeUID'
            }
        });
    });
