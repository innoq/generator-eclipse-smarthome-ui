const TEMPLATE = require('html!./ItemSelectorComponent.html');

export default function ItemSelectorComponent($log, itemService) {
  return {
    restrict: 'E',
    template: TEMPLATE,
    scope: {
      item: '=',
      type: '@'
    },
    link: function (scope) {
      scope.data = {
        items: []
      };

      itemService.getByTypeAndTags({type: scope.type}).$promise.then(function (items) {
        $log.debug(`Loaded ${items.length} items of type '${scope.type}'`);
        scope.data.items = items;
      });

      scope.$watch('data.selection', function (selectedItemName) {
        if (!selectedItemName) {
          return;
        }
        scope.item = scope.data.items.find(function (item) {
          return item.name === selectedItemName;
        });
      });

    }
  };
}
