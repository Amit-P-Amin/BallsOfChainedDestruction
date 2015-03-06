(function () {
  window.MovingObject = {};

  var MovingObjectBase = MovingObject.MovingObjectBase = function (options) {
    this.position = options.position;
    this.velocity = options.velocity;
    this.radius = options.radius;
    this.color = options.color;
    this.isBounceable = options.isBounceable
    this.game = options.game;
  };

  MovingObjectBase.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.globalAlpha = 1
    context.beginPath();
    context.arc(
      this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, true
    );
    context.fill();
  };

  MovingObjectBase.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Game.Utility.dist(this.position, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObjectBase.prototype.move = function () {
    this.position = [this.position[0] + this.velocity[0], this.position[1] + this.velocity[1]];

    if (this.game.isOutOfBounds(this.position)) {
      if (this.isBounceable) {
        this.bounce()
      } else {
        this.game.remove(this)
      }
    }

    // this.position = [Math.floor(this.position[0]), Math.floor(this.position[1])];
  };

  MovingObjectBase.prototype.bounce = function () {
    var perpendicularVector = this.game.wallPerpendicularVector(this.position);
    var speed = Game.Utility.norm(this.velocity);

    this.velocity = Game.Utility.reflection(Game.Utility.direction(this.velocity), perpendicularVector);
    this.velocity = [this.velocity[0] * speed, this.velocity[1] * speed]
  }

})();
