export default function LabelSetupService($resource) {
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
}
