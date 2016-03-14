export default angular.module('esh.rest-services')

    .factory('inboxService', function ($resource) {
        return $resource('/rest/inbox', {}, {
            getAll: {
                method: 'GET',
                isArray: true
            },
            approve: {
                method: 'POST',
                params: {
                    thingUID: '@thingUID'
                },
                url: '/rest/inbox/:thingUID/approve',
                headers: {
                    'Content-Type': 'text/plain'
                }
            },
            ignore: {
                method: 'POST',
                params: {
                    thingUID: '@thingUID'
                },
                url: '/rest/inbox/:thingUID/ignore'
            },
            remove: {
                method: 'DELETE',
                params: {
                    thingUID: '@thingUID'
                },
                url: '/rest/inbox/:thingUID'
            }
        })
    });
