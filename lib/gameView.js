(function () {
  if (typeof Balls === "undefined") {
    window.Balls = {};
  }

  var GameView = Balls.GameView = function (game, context) {
    this.context = context;
    this.game = game;
    this.timerId = null;
  };

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.context);
      }, 1000 / Balls.Game.FPS
    );

    // this.bindClickHandlers();
  };
})();
