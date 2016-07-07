export default function LinkService($resource) {
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
}
