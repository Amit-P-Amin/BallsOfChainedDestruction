(function() {

  var Group = MovingObject.BallGroup = function (){
    this.balls = [];
  };


  Group.prototype.remove = function (ball) {
    this.balls[ball.number] = null;
    debugger
  };


})();
