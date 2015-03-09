(function() {
  MovingObject.Balls = {}

  var Ball = MovingObject.Ball = function (game, ballNumber, groupNumber){
    this.game = game;
    this.number = ballNumber;
    this.effectDuration = 3500;
    this.groupNumber = groupNumber || null;
    MovingObject.MovingObjectBase.call(this);
    this.setDefaults();
  };

  Game.Utility.inherits(Ball, MovingObject.MovingObjectBase);

  Ball.prototype.setDefaults = function () {
    this.isBounceable = true;
    this.isExplodeable = true;
    this.isExploded = false;
    this.damage = 5;
  };

  Ball.prototype.explode = function () {
    if (this.splits == 1) {
      var speed = Game.Utility.norm(this.velocity);
      var ballGroup = new MovingObject.BallGroup();

      var ball1 = new MovingObject.Ball(this.game, 0, 0);
      ball1.position = this.position;
      ball1.velocity = [0 * speed, 1 * speed];
      ball1.position = [ball1.position[0] + ball1.velocity[0] * 3.5, ball1.position[1] + ball1.velocity[1] * 3.5];
      ball1.isDamageDealing = true;
      ball1.isFragile = true;
      ball1.isBounceable = false;
      ball1.isExploded = true;
      ball1.isBase = false;
      ball1.color = "orange";
      ballGroup.balls[0] = ball1;

      var ball2 = new MovingObject.Ball(this.game, 1, 0);
      ball2.position = this.position;
      ball2.velocity = [0 * speed, -1 * speed];
      ball2.position = [ball2.position[0] + ball2.velocity[0] * 3.5, ball2.position[1] + ball2.velocity[1] * 3.5];
      ball2.isDamageDealing = true;
      ball2.isFragile = true;
      ball2.isBounceable = false;
      ball2.isExploded = true;
      ball2.isBase = false;
      ball2.color = "orange";
      ballGroup.balls[1] = ball2;

      this.game.balls.ballGroups[0] = ballGroup;
      this.effectDuration = 0;

    }

    this.isDamageDealing = true;
    this.isExploded = true;
    this.isBounceable = false;

    var expansionId = setInterval(
      function () {
        this.radius += this.expansionSize;
      }.bind(this), 10
    );

    setTimeout(function () {
      clearInterval(expansionId);
    }.bind(this), 110);

    this.velocity = [0, 0];
    setTimeout(function () {
      this.game.remove(this);
    }.bind(this), this.effectDuration);
  };

})();
