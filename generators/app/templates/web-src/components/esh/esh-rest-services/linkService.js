export default angular.module('esh.rest-services')

    .factory('linkService', function ($resource) {
        return $resource('/rest/links', {}, {
            getAll: {
                method: 'GET',
                isArray: true
            },
            link: {
                method: 'PUT',
                params: {
                    itemName: '@itemName',
                    channelUID: '@channelUID'
                },
                url: '/rest/links/:itemName/:channelUID'
            },
            unlink: {
                method: 'DELETE',
                params: {
                    itemName: '@itemName',
                    channelUID: '@channelUID'
                },
                url: '/rest/links/:itemName/:channelUID'
            }
        });
    });
