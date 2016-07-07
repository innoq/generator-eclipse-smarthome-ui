export default function ThingService($q, $resource) {
  const JSON_HEADER = {
    'Content-Type': 'application/json'
  };

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
      url: '/rest/things/:thingUID'

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
      headers: JSON_HEADER
    },
    addViaSetup: {
      method: 'POST',
      url: '/rest/setup/things',
      headers: JSON_HEADER
    },
    update: {
      method: 'PUT',
      params: {
        thingUID: '@thingUID'
      },
      url: '/rest/things/:thingUID',
      headers: JSON_HEADER
    },
    updateConfig: {
      method: 'PUT',
      params: {
        thingUID: '@thingUID'
      },
      url: '/rest/things/:thingUID/config',
      headers: JSON_HEADER
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
}

