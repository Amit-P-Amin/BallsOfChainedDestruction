(function () {

  window.Gun = {};

  var Blaster = Gun.Blaster = function () {
    this.color = "#0F0F0F";
    this.position = [200, 400];
  };

  Blaster.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(
      this.position[0], this.position[1], 10, 0, 2 * Math.PI, true
    );
    context.fill();
  };

})();
