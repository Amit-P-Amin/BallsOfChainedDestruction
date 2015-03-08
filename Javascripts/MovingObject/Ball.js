(function() {
  MovingObject.Balls = {}

  var Ball = MovingObject.Ball = function (game, ballNumber){
    this.game = game;
    this.number = ballNumber;
    this.effectDuration = 3500;
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
    this.isDamageDealing = true;
    this.isExploded = true;
    this.isBounceable = false;

    var expansionId = setInterval(
      function () {
        this.radius += 1;
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
