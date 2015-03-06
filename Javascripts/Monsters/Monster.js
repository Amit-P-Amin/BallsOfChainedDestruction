(function () {

  window.Monsters = {};

  var Monster = Monsters.Monster = function (number, context) {
    this.position = [200, 200];
    this.radius = 25;
    this.health = 100;
    this.image = "../../Images/Monsters/1.gif"
    this.place(context);
    // this.game = game;
  };

  Monster.prototype.place = function (context) {
    $("#monster").html("<img class='monster'src='http://bestanimations.com/Fantasy/Monsters/Beholder-june.gif'>");
  };

  Monster.prototype.draw = function (context) {
    // $("canvas").append("<img src='http://bestanimations.com/Fantasy/Monsters/Beholder-june.gif'");
  };

})();
