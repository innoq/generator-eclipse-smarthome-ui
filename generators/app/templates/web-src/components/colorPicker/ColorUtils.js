'use strict';

export default function ColorUtils() {

  return {
    /**
     * @param {number}  r Red
     * @param {number}  g Green
     * @param {number}  b Blue
     * @returns {number[]}
     */
    rgb2hsl: function rgb2hsl(r, g, b) {
      r /= 255;
      g /= 255;
      b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      return [Math.floor(h * 365), s * 100, Math.floor(l * 100)];
    },

    paintColorBallToCanvas: function paintColorBallToCanvas(canvas) {
      var context = canvas.getContext('2d');
      var x = canvas.width / 2;
      var y = canvas.height / 2;
      var radius = x;
      var counterClockwise = false;
      var angle;
      for (angle = 0; angle <= 360; angle++) {
        var startAngle = (angle - 2) * Math.PI / 180;
        var endAngle = angle * Math.PI / 180;
        context.beginPath();
        context.moveTo(x, y);
        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
        context.closePath();
        var gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'hsl(' + angle + ', 10%, 100%)');
        gradient.addColorStop(1, 'hsl(' + angle + ', 100%, 50%)');
        context.fillStyle = gradient;
        context.fill();
      }
    }

  };

}
