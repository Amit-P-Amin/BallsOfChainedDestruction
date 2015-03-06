(function() {
  MovingObject.Balls = {}

  MovingObject.Balls.COLOR = "blue";
  MovingObject.Balls.RADIUS = 8;

  MovingObject.Ball = function Ball(position, game){
    var velocity = Game.Utility.randomVector(5);
    var radius = MovingObject.Balls.RADIUS;
    var color = MovingObject.Balls.COLOR;
    var options = {position: position, velocity: velocity, radius: radius, color: color, game: game, isBounceable: true}
    MovingObject.MovingObjectBase.call(this, options);
  }

  Game.Utility.inherits(MovingObject.Ball, MovingObject.MovingObjectBase);
})();
