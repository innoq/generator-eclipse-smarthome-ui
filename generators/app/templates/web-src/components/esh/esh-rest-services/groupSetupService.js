'use strict';


export default angular.module('esh.rest-services')

    .factory('groupSetupService', function ($resource) {
        return $resource('/rest/setup/groups', {}, {
            add: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            remove: {
                method: 'DELETE',
                params: {
                    itemName: '@itemName'
                },
                url: '/rest/setup/groups/:itemName'
            },
            getAll: {
                method: 'GET',
                isArray: true
            }
        });
    });
