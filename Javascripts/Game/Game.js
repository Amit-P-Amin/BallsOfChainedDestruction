(function () {

  var Controller = Game.Controller = function (context) {
    this.balls = [];
    this.bullets = [];
    this.gun = new Gun.Blaster(this);
    this.monster = new Monsters.Monster(1, context);

    var tempBall = new MovingObject.Ball([250, 250], this);
    this.add(tempBall);
  };

  Controller.prototype.add = function (object) {
    if (object instanceof MovingObject.Ball) {
      this.balls.push(object);
    } else {
      this.bullets.push(object);
    }
  };

  Controller.prototype.allObjects = function () {
    return []
      .concat(this.balls)
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
   } else if (object instanceof MovingObject.Bullet) {
     this.bullets.splice(this.bullets.indexOf(object), 1);
   }
 };

})();
