(function () {

  window.Gun = {};

  var Blaster = Gun.Blaster = function (game) {
    this.color = "#0F0F0F";
    this.position = [200, 400];
    this.game = game;
  };

  Blaster.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(
      this.position[0], this.position[1], 10, 0, 2 * Math.PI, true
    );
    context.fill();
  };

  Blaster.prototype.move = function (direction) {
    this.position = [this.position[0] + direction[0], this.position[1] + direction[1]];

  };

  Blaster.prototype.fireBullet = function () {

   var bullet = new MovingObject.Bullet(this.position, this.game);
   this.game.add(bullet);
 };

})();
