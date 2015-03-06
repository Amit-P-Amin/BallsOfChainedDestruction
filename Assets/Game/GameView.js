(function () {
  window.Game = {};

  var View = Game.View = function (game, context) {
    this.context = context;
    this.game = game;
    this.timerId = null;
  };

  Game.BG_COLOR = "#FFFFFF";
  Game.FPS = 50;
  Game.DIM_X = 400;
  Game.DIM_Y = 400;

  View.prototype.start = function () {
    var gameView = this;

    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.context);
        window.requestAnimationFrame
      }, 1000 / Game.FPS
    );

  };
})();
