import 'jquery-ui/draggable';
const TEMPLATE = require('html!./ColorPickerComponent.html');

export default function ColorPickerComponent($log, itemService, colorUtils) {

  var throttle = (func, ms = 50, context = window) => {
    let to;
    let wait = false;
    return (...args) => {
      let later = () => {
        func.apply(context, args);
      };
      if (!wait) {
        later();
        wait = true;
        if (to) {
          clearTimeout(to);
        }
        to = setTimeout(() => {
          wait = false;
        }, ms);
      }
    };
  };

  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    template: TEMPLATE,
    link: function (scope, elem) {

      $log.debug('ColorPickerCtrl has entered the stage!');

      let canvas = $('canvas', elem)[0];
      // let context = canvas.getContext('2d');
      colorUtils.paintColorBallToCanvas(canvas);
      updateDragger($('.dragger', elem), [0, 0, 0]);

      $('.dragger', elem).draggable({drag: dragHandler});

      let throttledItemUpdate = throttle(function (hsl) {
        itemService.sendCommand({itemName: scope.item.name}, hsl.join(','));
      }, 200);

      let throttledColorValueUpdate = throttle(updateDragger, 200);


      function dragHandler() {
        let $canvas = $('canvas', elem);
        let $dragger = $('.dragger', elem);
        let context = canvas.getContext('2d');

        let canvasOffset = $canvas.offset();
        let draggerOffset = $dragger.offset();
        let canvasX = draggerOffset.left - canvasOffset.left;
        let canvasY = draggerOffset.top - canvasOffset.top;

        let imageData = context.getImageData(canvasX, canvasY, 1, 1);
        let hsl = colorUtils.rgb2hsl.apply(null, imageData.data);

        throttledColorValueUpdate($dragger, hsl);
        throttledItemUpdate(hsl);

        let pixelColor = 'hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)';
        $dragger.css('backgroundColor', pixelColor);
      }

      function updateDragger($dragger, hsl) {
        let i = 0, lis = $dragger.find('li');
        for (; i < 3; i++) {
          lis.get(i).innerHTML = hsl[i];
        }
      }

    }
  };
}
