(function () {
  if (typeof Balls === "undefined") {
    Balls.Balls = {};
  }

  var Game = Balls.Game = function () {
    this.balls = [];
    this.bullets = [];

    this.addAsteroids();
  };

  Game.BG_COLOR = "#000000";
  Game.FPS = 32;

  Game.prototype.add = function (object) {
    if (object instanceof Balls.Ball) {
      this.balls.push(object);
    } else if (object instanceof Balls.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Balls.Ship) {
      this.ships.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.addAsteroids = function (numAsteroids) {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Balls.Asteroid({ game: this }));
    }
  };

  Game.prototype.allObjects = function () {
    return []
      .concat(this.ships)
      .concat(this.asteroids)
      .concat(this.bullets);
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0)
      || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Balls.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Balls.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids[idx] = new Balls.Asteroid({ game: this });
    } else if (object instanceof Balls.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function (pos) {
    return [
      wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
    ];

    function wrap (coord, max) {
      if (coord < 0) {
        return max - (coord % max);
      } else if (coord > max) {
        return coord % max;
      } else {
        return coord;
      }
    }
  };
})();
