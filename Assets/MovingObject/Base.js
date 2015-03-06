(function () {
  window.MovingObject = {};

  var MovingObjectBase = MovingObject.MovingObjectBase = function (options) {
    this.pos = options.position;
    this.vel = options.velocity;
    this.radius = options.radius;
    this.color = options.color;
    this.isBounceable = options.isBounceable
    this.game = options.game;
  };

  MovingObjectBase.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 1
    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  };

  MovingObjectBase.prototype.isCollidedWith = function (otherObject) {
    var centerDist = Game.Utility.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  };

  MovingObjectBase.prototype.move = function () {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];

    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isBounceable) {
        this.bounce()
      } else {
        this.game.remove(this)
      }
    }

    // this.pos = [Math.floor(this.pos[0]), Math.floor(this.pos[1])];
  };

  MovingObjectBase.prototype.bounce = function () {
    var wallVector = this.game.wallPerpendicularVector(this.pos);
    var speed = Game.Utility.norm(this.vel);

    this.vel = Game.Utility.reflection(Game.Utility.dir(this.vel), wallVector);
    this.vel = [this.vel[0] * speed, this.vel[1] * speed]
  }

})();
