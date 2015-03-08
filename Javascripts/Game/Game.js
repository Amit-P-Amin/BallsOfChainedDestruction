(function () {

  var Controller = Game.Controller = function (context) {
    this.balls = new MovingObject.BallsController(this);
    this.monster = new Monsters.Monster(1, context);
    this.context = context;
    // this.balls.addBall([["size", 1], ["duration", 1], ["expander", 1]]);
    // this.balls.addBall([["size", 1], ["duration", 1], ["expander", 1]]);
    this.balls.addBall([["size", 1], ["duration", 1], ["splitter", 1]]);
    this.bullets = [];
    this.gun = new Gun.Blaster(this);
  };

  Controller.prototype.add = function (object) {
    this.bullets.push(object);
  };

  Controller.prototype.allObjects = function () {
    return []
      .concat(this.monster)
      .concat(this.balls.allBalls())
      .concat(this.gun)
      .concat(this.bullets)
  };

  Controller.prototype.draw = function (context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    context.fillStyle = Game.BG_COLOR;
    context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(context);
    });
  };

  Controller.prototype.isOutOfBounds = function (position, radius) {
    var left = position[0] - radius;
    var right = position[0] + radius;
    var top = position[1] - radius;
    var bottom = position[1] + radius;
    return (left < 0) || (right > Game.DIM_X) || (top < 0) || (bottom > Game.DIM_Y);
  };

  Controller.prototype.wallPerpendicularVector = function (position, radius) {
    var left = position[0] - radius;
    var right = position[0] + radius;
    var top = position[1] - radius;
    var bottom = position[1] + radius;
    if (left < 0) {
      return [1, 0]
    } else if (top < 0) {
      return [0, 1]
    } else if (right > Game.DIM_X) {
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

  Controller.prototype.randomPosition = function (radius1) {
    var position = [200, 200];
    var objects = this.allObjects();
    var freeLocation = false;

    while (!freeLocation) {
      freeLocation = true;
      position = [
        (Game.DIM_X *.80 * Math.random() + Game.DIM_X *.10),
        (Game.DIM_Y *.80 * Math.random() + Game.DIM_Y *.10)
      ]

      objects.forEach(function(object) {
        if (object != undefined)
          if (this.isCollided(position, object.position, radius1, object.radius)) {
            freeLocation = false;
          }
      }.bind(this))
    }

    return position;
  };

  Controller.prototype.isCollided = function(position1, position2, radius1, radius2) {
    var centerDistance = Game.Utility.distance(position1, position2);
    return centerDistance < (radius1 + radius2);
  };

  Controller.prototype.step = function () {
    this.replaceMonster();
    this.moveObjects();
  };

  Controller.prototype.replaceMonster = function () {
    if (this.monster.health <= 0) {
      this.monster = new Monsters.Monster(1, this.context);
    }
  };

  Controller.prototype.remove = function (object) {
    if (object instanceof MovingObject.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof MovingObject.Ball) {
      this.balls.remove(object);
    }
 };

})();
