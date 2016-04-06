'use strict';

module.exports = angular
  .module('colorPicker')
  .directive('colorPicker', ($log, itemService, colorUtils) => {
    return {
      restrict: 'E',
      scope: {
        item: '='
      },
      link: function (scope, attr, elem) {

        $log.debug('ColorPickerCtrl has entered the stage!');

        var canvas = $('canvas', elem)[0];
        var context = canvas.getContext('2d');
        colorUtils.paintColorBallToCanvas(canvas);
        updateDragger($('.dragger', elem), [0,0,0]);

        $('.dragger', elem).draggable({drag: dragHandler});

        function dragHandler() {
          var $canvas = $('canvas', elem);
          var $dragger = $('.dragger', elem);
          var context = canvas.getContext('2d');

          var canvasOffset = $canvas.offset();
          var draggerOffset = $dragger.offset();
          var canvasX = draggerOffset.left - canvasOffset.left;
          var canvasY = draggerOffset.top - canvasOffset.top;

          var imageData = context.getImageData(canvasX, canvasY, 1, 1);
          var hsl = colorUtils.rgb2hsl.apply(null, imageData.data);

          updateDragger($dragger, hsl);

          var pixelColor = 'hsl(' + hsl[0] + ',' + hsl[1] + '%,' + hsl[2] + '%)';
          $dragger.css('backgroundColor', pixelColor);
        }

        function updateDragger($dragger, hsl) {
          var i= 0, lis = $dragger.find('li');
          for (; i<3; i++) {
            lis.get(i).innerHTML = hsl[i];
          }
        }

      }
    };
  });
