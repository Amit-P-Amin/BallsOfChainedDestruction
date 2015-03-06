(function() {
  MovingObject.Bullets = {}

  var Bullets = MovingObject.Bullets

  Bullets.RADIUS = 20;
  Bullets.SPEED = 15;
  Bullets.COLOR = "#1A380D"

  var Bullet = MovingObject.Bullet = function (position, game) {
    var radius = Bullets.RADIUS;
    var velocity = [0, -1 * Bullets.SPEED];
    var color = Bullets.COLOR;
    var options = {position: position, velocity: velocity, radius: radius, color: color, game: game, isBounceable: false}
    MovingObject.MovingObjectBase.call(this, options);
  };

  Game.Utility.inherits(Bullet, MovingObject.MovingObjectBase);
})();
