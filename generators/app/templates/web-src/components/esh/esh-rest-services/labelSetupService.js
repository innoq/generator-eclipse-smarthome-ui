export default angular.module('esh.rest-services')

    .factory('labelSetupService', function ($resource) {
        return $resource('/rest/setup/labels', {}, {
            setLabel: {
                method: 'PUT',
                params: {
                    itemName: '@itemName'
                },
                url: '/rest/setup/labels/:itemName',
                headers: {
                    'Content-Type': 'text/plain'
                }
            }
        });
    });
