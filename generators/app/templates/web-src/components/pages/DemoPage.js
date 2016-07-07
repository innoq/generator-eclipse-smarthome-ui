const TEMPLATE = require('html!./DemoPage.html');

export default function DeomoPageConfig($routeProvider) {
  $routeProvider.when('/colorPicker', {
    template: TEMPLATE,
    controller: function () {
      this.data = {};
    }
  });
}
