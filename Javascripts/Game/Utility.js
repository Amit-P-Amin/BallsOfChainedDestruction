(function () {
  window.Game.Utility = {};
  var Utility = Game.Utility;

  // Normalize the length of the vector to 1, maintaining direction.
  var direction = Utility.direction = function (vector) {
    var norm = Utility.norm(vector);
    return Utility.scale(vector, 1 / norm);
  };

  // Find distance between two points.
  var distance = Utility.distance = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  // Find the length of the vector.
  var norm = Utility.norm = function (vector) {
    return Utility.distance([0, 0], vector);
  };

  // Return a randomly oriented vector with the given length.
  var randomVector = Utility.randomVector = function (length) {
    var degree = 2 * Math.PI * Math.random();

    return scale([Math.sin(degree), Math.cos(degree)], length);
  };

  var vector = Utility.vector = function (deg) {
    return scale([Math.sin(degree), Math.cos(degree)], 2);
  }

  // Scale the length of a vector by the given amount.
  var scale = Utility.scale = function (vector, m) {
    return [vector[0] * m, vector[1] * m];
  };

  // Get reflection from incoming vector(d) and wall perpendicular(n), using d−2((d⋅n)/(n⋅n))n.
  var reflection = Utility.reflection = function (d, n) {
    var topDotProduct = n[0] * d[0] + n[1] * d[1];
    var bottomDotProduct = n[0] * n[0] + n[1] * n[1];
    var rightProduct = 2 * topDotProduct / bottomDotProduct;
    var rightSide = [rightProduct * n[0], rightProduct * n[1]];
    return [d[0] - rightSide[0], d[1] - rightSide[1]];
  };

  // Get the x, y coordinates of the intersection of two circles.
  var intersection = Utility.intersection = function (x0, y0, r0, x1, y1, r1) {
    var a, dx, dy, d, h, rx, ry;
    var x2, y2;

    /* dx and dy are the vertical and horizontal distances between
     * the circle centers.
     */
    dx = x1 - x0;
    dy = y1 - y0;

    /* Determine the straight-line distance between the centers. */
    d = Math.sqrt((dy*dy) + (dx*dx));

    /* Check for solvability. */
    if (d > (r0 + r1)) {
        /* no solution. circles do not intersect. */
        return false;
    }
    if (d < Math.abs(r0 - r1)) {
        /* no solution. one circle is contained in the other */
        return false;
    }

    /* 'point 2' is the point where the line through the circle
     * intersection points crosses the line between the circle
     * centers.
     */

    /* Determine the distance from point 0 to point 2. */
    a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;

    /* Determine the coordinates of point 2. */
    x2 = x0 + (dx * a/d);
    y2 = y0 + (dy * a/d);

    /* Determine the distance from point 2 to either of the
     * intersection points.
     */
    h = Math.sqrt((r0*r0) - (a*a));

    /* Now determine the offsets of the intersection points from
     * point 2.
     */
    rx = -dy * (h/d);
    ry = dx * (h/d);

    /* Determine the absolute intersection points. */
    var xi = x2 + rx;
    var xi_prime = x2 - rx;
    var yi = y2 + ry;
    var yi_prime = y2 - ry;

    return [(xi + xi_prime) / 2, (yi + yi_prime) / 2];
  }

  var inherits = Game.Utility.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

})();
