export default function ThingTypeService($resource) {
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
}
