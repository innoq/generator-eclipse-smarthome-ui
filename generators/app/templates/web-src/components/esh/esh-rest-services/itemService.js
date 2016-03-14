'use strict';

angular
    .module('esh-rest-services')
    .factory('itemService', function ($resource) {

        return $resource('/rest/items', {}, {
            getAll: {
                method: 'GET',
                isArray: true,
                url: '/rest/items?recursive=:recursive',
                params: {
                    recursive: '@recursive'
                },
                paramDefaults: {
                    recursive: false
                }
            },
            getByTypeAndTags: {
                method: 'GET',
                isArray: true,
                url: '/rest/items?recursive=:recursive',
                params: {
                    type: '@type',
                    tags: '@tags',
                    recursive: '@recursive'
                },
                paramDefaults: {
                    recursive: false
                }
            },
            getByName: {
                method: 'GET',
                url: '/rest/items/:itemName',
                ignoreErrors: function (response) {
                    if (response.config.url === '/rest/items/knxcom_datastore' && response.status === 404) {
                        return false;
                    }
                }
            },
            remove: {
                method: 'DELETE',
                params: {
                    itemName: '@itemName'
                },
                url: '/rest/items/:itemName'
            },
            save: {
                method: 'PUT',
                params: {
                    itemName: '@itemName'
                },
                url: '/rest/items/:itemName',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            updateState: {
                method: 'PUT',
                params: {
                    itemName: '@itemName'
                },
                url: '/rest/items/:itemName/state',
                headers: {
                    'Content-Type': 'text/plain'
                }
            },
            sendCommand: {
                method: 'POST',
                params: {
                    itemName: '@itemName'
                },
                url: '/rest/items/:itemName',
                headers: {
                    'Content-Type': 'text/plain'
                }
            },
            addMember: {
                method: 'PUT',
                params: {
                    itemName: '@itemName',
                    memberItemName: '@memberItemName'
                },
                url: '/rest/items/:itemName/members/:memberItemName'
            },
            removeMember: {
                method: 'DELETE',
                params: {
                    itemName: '@itemName',
                    memberItemName: '@memberItemName'
                },
                url: '/rest/items/:itemName/members/:memberItemName'
            },
            addTag: {
                method: 'PUT',
                params: {
                    itemName: '@itemName',
                    tag: '@tag'
                },
                url: '/rest/items/:itemName/tags/:tag'
            },
            removeTag: {
                method: 'DELETE',
                params: {
                    itemName: '@itemName',
                    tag: '@tag'
                },
                url: '/rest/items/:itemName/tags/:tag'
            }
        });
    })
