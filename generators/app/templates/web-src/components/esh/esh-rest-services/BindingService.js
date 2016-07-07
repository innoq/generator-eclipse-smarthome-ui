export default function BindingService($resource) {
  return $resource('/rest/bindings', {}, {
    getAll: {
      method: 'GET',
      cache: true,
      isArray: true
    }
  });
}
