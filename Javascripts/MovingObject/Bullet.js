(function() {

  var Bullet = MovingObject.Bullet = function (position, game) {
    this.game = game;
    MovingObject.MovingObjectBase.call(this);
    this.setDefaults(position);
  };

  Game.Utility.inherits(Bullet, MovingObject.MovingObjectBase);

  Bullet.prototype.setDefaults = function (position) {
    this.isDamageDealing = true;
    this.isFragile = true;
    this.radius = 20;
    this.velocity = [0, -1 * 15];
    this.color = "#1A380D";
    this.position = [position[0], position[1] - this.radius];
    this.damage = 5;
  };

})();
