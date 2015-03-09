(function() {
  MovingObject.BallsController = {}

  var Balls = MovingObject.BallsController = function (game){
    this.ballGems = {};
    this.balls = [];
    this.ballGroups = [];
    this.game = game;
  };

  Balls.prototype.setEffects = function (ball) {
    var gems = this.ballGems[ball.number];

    gems.forEach( function (gem) {
      var gemType = gem[0];
      var gemLevel = gem[1];
      if (gemType === "size") {
        ball.radius += 4 * gemLevel;
      } else if (gemType === "duration") {
        ball.effectDuration += 500 * gemLevel
      } else if (gemType === "splitter") {
        ball.splits = gemLevel;
      } else if (gemType === "expander") {
        ball.expansionSize = gemLevel;
      }
    })

    return ball;
  };

  Balls.prototype.addBall = function (gems) {
    var index = this.balls.length || 0
    this.ballGems[index] = gems;
    this.spawn(index);
  };

  Balls.prototype.count = function () {
    return this.balls.length;
  };

  Balls.prototype.spawn = function (index) {
    var ball = new MovingObject.Ball(this.game, index);
    ball = this.setEffects(ball);
    this.balls[index] = ball;
  };

  Balls.prototype.remove = function (ball) {
    if (ball.groupNumber != null) {
      this.ballGroups[ball.groupNumber].remove(ball);
    } else if (ball.isBase === true){
      setTimeout(function () {
        this.spawn(ball.number);
      }.bind(this), 1000);
    }
    this.balls[ball.number] = null;
  };

  Balls.prototype.allBalls = function () {
    var balls = []

    this.balls.forEach(function (ball) {
      if (ball != null) {
        balls.push(ball)
      }
    })

    if (this.ballGroups.length > 0) {
      this.ballGroups.forEach(function (group) {
        group.balls.forEach(function (ball) {
          if (ball != null) {
            balls.push(ball)
          }
        })
      })
    }
    return balls
  }

})();
