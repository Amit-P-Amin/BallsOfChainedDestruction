(function() {
  MovingObject.BallsController = {}

  var Balls = MovingObject.BallsController = function (game){
    this.ballGems = {};
    this.balls = {};
    this.game = game;
  };

  Balls.prototype.addBall = function () {
    var index = this.balls.length || 0
    this.ballGems[index] = [1];
    this.spawn(index);
  };

  Balls.prototype.count = function () {
    return this.balls.length;
  };

  Balls.prototype.spawn = function (index) {
    if (this.ballGems[index][0] === [1][0]) {
      var ball = new MovingObject.Ball([250, 250], this.game, 0);
      this.balls[index] = ball
    }

  };

  Balls.prototype.destroy = function (ball) {
    setTimeout(function () {
      this.spawn(ball.number);
    }.bind(this), 1000);
    this.balls[ball.number] = null;
  };

  Balls.prototype.allBalls = function () {
    var balls = []

    for (var key in this.balls) {
      value = this.balls[key]
      if (value != null) {
        balls.push(value);
      }
    }

    return balls
  }
})();
