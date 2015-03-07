(function() {
  MovingObject.Balls = {}

  MovingObject.Balls.COLOR = "blue";
  MovingObject.Balls.RADIUS = 8;

  var Ball = MovingObject.Ball = function (position, game, ballNumber){
    this.number = ballNumber;
    var velocity = Game.Utility.randomVector(5);
    var radius = MovingObject.Balls.RADIUS;
    var color = MovingObject.Balls.COLOR;
    var options = {position: position, velocity: velocity, radius: radius, color: color, game: game, isBounceable: true, isExplodeable: true}
    MovingObject.MovingObjectBase.call(this, options);
  };

  Game.Utility.inherits(Ball, MovingObject.MovingObjectBase);

  Ball.prototype.explode = function () {
    this.exploded = true;

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
      this.game.removeBall(this);
    }.bind(this), 1500);
  };

})();
