(function () {
  window.MovingObject = {};

  var MovingObjectBase = MovingObject.MovingObjectBase = function () {
    this.velocity = Game.Utility.randomVector(5);
    this.radius = 18;
    this.position = this.game.randomPosition(this.radius);
    this.color = "blue";
    this.isBounceable = false;
    this.isExplodeable = false;
    this.isDamageDealing = false;
  };

  MovingObjectBase.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(
      this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, true
    );
    context.fill();
  };

  MovingObjectBase.prototype.isCollidedWith = function (otherObject) {
    var centerDistance = Game.Utility.distance(this.position, otherObject.position);
    return centerDistance < (this.radius + otherObject.radius);
  };

  MovingObjectBase.prototype.move = function () {
    this.position = [this.position[0] + this.velocity[0], this.position[1] + this.velocity[1]];

    this.checkCollisions();

    if (this.game.isOutOfBounds(this.position, this.radius)) {
      if (this.isBounceable) {
        this.wallBounce()
      } else {
        this.game.remove(this)
      }
    }
  };

  MovingObjectBase.prototype.checkCollisions = function () {
    this.game.allObjects().forEach(function (object) {
      if (this != object) {
        if (this.isCollidedWith(object)) {
          if (object instanceof Monsters.Monster) {
            if (this.isDamageDealing) {
              this.game.monster.health -= this.damage;
              this.isDamageDealing = false;
              if (this.isFragile) {
                this.game.remove(this)
              }
            } else {
              this.bounce(this, this.game.monster);
            }
          } else if (object.isDamageDealing == true && this.isExplodeable && this.isExploded == false) {
            if (object.isFragile) {
              this.game.remove(object);
            }
            this.explode();
          } else if (object.isDamageDealing == true && this.isFragile) {
            this.game.remove(this);
          }
          else if (this.isBounceable && object instanceof MovingObject.Ball) {
            this.bounce(this, object);
          }
        }
      }
    }.bind(this));
  };


  MovingObjectBase.prototype.bounce = function (object1, object2) {
    var x0 = object1.position[0];
    var y0 = object1.position[1];
    var r0 = object1.radius;
    var x1 = object2.position[0];
    var y1 = object2.position[1];
    var r1 = object2.radius;
    var intersection = Game.Utility.intersection(x0, y0, r0, x1, y1, r1);
    var perpendicularVector = Game.Utility.direction([x0 - intersection[0], y0 - intersection[1]]);
    var speed = Game.Utility.norm(this.velocity);

    this.velocity = Game.Utility.reflection(Game.Utility.direction(this.velocity), perpendicularVector);
    this.velocity = [this.velocity[0] * speed, this.velocity[1] * speed];

    // Dealing with two balls merging together
    var oldPosition = this.position;
    var count = 0;
    while (this.isCollidedWith(object2) && count < 10) {
      count++;
      this.position = [this.position[0] + this.velocity[0] * .1, this.position[1] + this.velocity[1] * .1];
    }
    if (count > 9) {
      this.position = oldPosition;
      this.velocity = [perpendicularVector[0] * speed, perpendicularVector[1] * speed];
    }
  }

  MovingObjectBase.prototype.wallBounce = function () {
    var perpendicularVector = this.game.wallPerpendicularVector(this.position, this.radius);
    var speed = Game.Utility.norm(this.velocity);

    this.velocity = Game.Utility.reflection(Game.Utility.direction(this.velocity), perpendicularVector);
    this.velocity = [this.velocity[0] * speed, this.velocity[1] * speed];

    // Dealing with ball jiggling back and forth in wall
    var oldPosition = this.position;
    var count = 0;
    while (this.game.isOutOfBounds(this.position, this.radius) && count < 10) {
      count++;
      this.position = [this.position[0] + this.velocity[0] * .1, this.position[1] + this.velocity[1] * .1];
    }
    if (count > 9) {
      this.position = oldPosition
      this.velocity = [perpendicularVector[0] * speed, perpendicularVector[1] * speed];
    }
  }

})();
