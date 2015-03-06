(function () {

  var Controller = Game.Controller = function () {
    this.balls = [];
    var tempBall = new MovingObject.Ball([250, 250], this);
    this.add(tempBall);
  };

  Controller.prototype.add = function (object) {
      this.balls.push(object);
  };

  Controller.prototype.allObjects = function () {
    return []
      .concat(this.balls)
  };

  Controller.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Controller.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Controller.prototype.wallPerpendicularVector = function (pos) {
    if (pos[0] < 0) {
      return [1, 0]
    } else if (pos[1] < 0) {
      return [0, 1]
    } else if (pos[0] > Game.DIM_X) {
      return [-1, 0]
    } else {
      return [0, -1]
    }
  }
  Controller.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Controller.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Controller.prototype.step = function () {
    this.moveObjects();
  };

  Controller.prototype.remove = function (object) {
   if (object instanceof MovingObject.Ball) {
     this.balls.splice(this.balls.indexOf(object), 1);
   }
 };

})();
