(function () {
  window.Game = {};

  var View = Game.View = function (game, context) {
    this.context = context;
    this.game = game;
    this.timerId = null;
    this.gun = game.gun;
  };

  Game.BG_COLOR = "#FFFFFF";
  Game.FPS = 50;
  Game.DIM_X = 400;
  Game.DIM_Y = 400;

  Game.MOVES = {
    "left": [-7,  0],
    "right": [ 7,  0],
  };

  View.prototype.bindKeyHandlers = function () {
    var gun = this.gun;

    Object.keys(Game.MOVES).forEach(function (k) {
      var shift = Game.MOVES[k];
      key(k, function () { gun.move(shift); });
    });

    key("space", function () { gun.fireBullet() });
  };


  View.prototype.start = function () {
    var gameView = this;

    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.context);
        window.requestAnimationFrame;
      }, 1000 / Game.FPS
    );

    this.bindKeyHandlers();
  };
})();
