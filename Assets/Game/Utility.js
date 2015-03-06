(function () {
  window.Game.Utility = {};
  var Utility = Game.Utility;

  // Normalize the length of the vector to 1, maintaining direction.
  var dir = Utility.dir = function (vec) {
    var norm = Utility.norm(vec);
    return Utility.scale(vec, 1 / norm);
  };

  // Find distance between two points.
  var dist = Utility.dist = function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  };

  // Find the length of the vector.
  var norm = Utility.norm = function (vec) {
    return Utility.dist([0, 0], vec);
  };

  // Return a randomly oriented vector with the given length.
  var randomVec = Utility.randomVec = function (length) {
    var deg = 2 * Math.PI * Math.random();

    return scale([Math.sin(deg), Math.cos(deg)], length);
  };

  var vec = Utility.vec = function (deg) {
    return scale([Math.sin(deg), Math.cos(deg)], 2);
  }

  // Scale the length of a vector by the given amount.
  var scale = Utility.scale = function (vec, m) {
    return [vec[0] * m, vec[1] * m];
  };

  // Get reflection from incoming vector(d) and wall perpendicular(n), using d−2((d⋅n)/(n⋅n))n.
  var reflection = Utility.reflection = function (d, n) {
    var topDotProduct = n[0] * d[0] + n[1] * d[1];
    var bottomDotProduct = n[0] * n[0] + n[1] * n[1];
    var rightProduct = 2 * topDotProduct / bottomDotProduct;
    var rightSide = [rightProduct * n[0], rightProduct * n[1]];
    return [d[0] - rightSide[0], d[1] - rightSide[1]];
  };

  var inherits = Game.Utility.inherits = function (ChildClass, BaseClass) {
    function Surrogate () { this.constructor = ChildClass };
    Surrogate.prototype = BaseClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

})();
