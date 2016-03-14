export default angular.module('esh.rest-services')

    .factory('thingSetupService', function ($resource) {
        return $resource('/rest/setup/things', {}, {
            add: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            update: {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            getAll: {
                method: 'GET',
                isArray: true
            },
            remove: {
                method: 'DELETE',
                params: {
                    thingUID: '@thingUID'
                },
                url: '/rest/setup/things/:thingUID'
            },
            enableChannel: {
                method: 'PUT',
                params: {
                    channelUID: '@channelUID'
                },
                url: '/rest/setup/things/channels/:channelUID'
            },
            disableChannel: {
                method: 'DELETE',
                params: {
                    channelUID: '@channelUID'
                },
                url: '/rest/setup/things/channels/:channelUID'
            }
        });
    });
