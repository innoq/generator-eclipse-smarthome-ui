'use strict';

angular
    .module('esh-rest-services')
    .factory('thingService', function ($q, $resource) {
        return $resource('/rest/things', {}, {
            getAll: {
                method: 'GET',
                isArray: true
            },
            getByUid: {
                method: 'GET',
                params: {
                    thingUID: '@thingUID'
                },
                url: '/rest/things/:thingUID',
                //
                // define ignoreErrors function for ErrorInterceptorService
                //
                ignoreErrors: function (response) {
                    // when testing for the KNX bridge, ignore errors
                    if (-1 !== response.config.url.indexOf('knx:ip:knxcom_bridge')) {
                        return true;
                    }
                }

            },
            remove: {
                method: 'DELETE',
                params: {
                    thingUID: '@thingUID',
                    force: '@force'
                },
                url: '/rest/things/:thingUID/'
            },
            add: {
                method: 'POST',
                url: '/rest/things',
                ignoreErrors: function (response) {
                    if (response.config.data.UID === 'knx:ip:knxcom_bridge') {
                        return true;
                    }
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            addViaSetup: {
                method: 'POST',
                url: '/rest/setup/things',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            update: {
                method: 'PUT',
                params: {
                    thingUID: '@thingUID'
                },
                url: '/rest/things/:thingUID',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            updateConfig: {
                method: 'PUT',
                params: {
                    thingUID: '@thingUID'
                },
                url: '/rest/things/:thingUID/config',
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            link: {
                method: 'POST',
                params: {
                    thingUID: '@thingUID',
                    channelId: '@channelId'
                },
                url: '/rest/things/:thingUID/channels/:channelId/link',
                headers: {
                    'Content-Type': 'text/plain'
                }
            },
            unlink: {
                method: 'DELETE',
                params: {
                    thingUID: '@thingUID',
                    channelId: '@channelId'
                },
                url: '/rest/things/:thingUID/channels/:channelId/link'
            }
        });
    });
