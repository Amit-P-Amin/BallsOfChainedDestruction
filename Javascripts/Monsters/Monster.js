(function () {

  window.Monsters = {};

  var Monster = Monsters.Monster = function (number, context) {
    this.position = [200, 200];
    this.radius = 30;
    this.health = 100;
    this.image = "../../Images/Monsters/1.gif";
    this.place(context);
    this.color = "red";
  };

  Monster.prototype.place = function (context) {
    $("#monster").html("<span class='centering-helper'></span><img class='monster'src='http://bestanimations.com/Fantasy/Monsters/Beholder-june.gif'>");
  };

  Monster.prototype.draw = function (context) {
    this.drawFullHealth(context);
    this.deleteLostHealth(context);
  };

  Monster.prototype.drawFullHealth = function (context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(
      this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, true
    );
    context.fill();
  }

  Monster.prototype.deleteLostHealth = function (context) {
    context.fillStyle = "white";
    var fillHeight = 60 * (1 - (this.health / 100));
    context.fillRect(170,170,60,fillHeight);
  }

})();
