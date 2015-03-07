(function () {

  var Controller = Game.Controller = function (context) {
    this.balls = new MovingObject.BallsController(this);
    this.balls.addBall();
    this.bullets = [];
    this.gun = new Gun.Blaster(this);
    this.monster = new Monsters.Monster(1, context);
  };

  Controller.prototype.add = function (object) {
    this.bullets.push(object);
  };

  Controller.prototype.allObjects = function () {
    return []
      .concat(this.balls.allBalls())
      .concat(this.gun)
      .concat(this.bullets)
      .concat(this.monster)
  };

  Controller.prototype.draw = function (context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    context.fillStyle = Game.BG_COLOR;
    context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(context);
    });
  };

  Controller.prototype.isOutOfBounds = function (position) {
    return (position[0] < 0) || (position[1] < 0)
      || (position[0] > Game.DIM_X) || (position[1] > Game.DIM_Y);
  };

  Controller.prototype.wallPerpendicularVector = function (position) {
    if (position[0] < 0) {
      return [1, 0]
    } else if (position[1] < 0) {
      return [0, 1]
    } else if (position[0] > Game.DIM_X) {
      return [-1, 0]
    } else {
      return [0, -1]
    }
  }
  Controller.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      if (object instanceof MovingObject.Ball || object instanceof MovingObject.Bullet) {
        object.move();
      }
    });
  };

  Controller.prototype.removeBall = function (ball) {
    this.balls.destroy(ball);
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
    if (object instanceof MovingObject.Bullet) {
       this.bullets.splice(this.bullets.indexOf(object), 1);
    }
 };

})();
