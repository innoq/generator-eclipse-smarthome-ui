export default function DiscoveryService($resource) {
  return $resource('/rest/discovery', {}, {
    getAll: {
      method: 'GET',
      isArray: true
    },
    scan: {
      method: 'POST',
      params: {
        bindingId: '@bindingId'
      },
      url: '/rest/discovery/bindings/:bindingId/scan'
    }
  });
}
