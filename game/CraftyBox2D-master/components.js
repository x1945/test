Crafty.c("Border", {
	required : "2D, Canvas, Color",
	show : function() {
		var ctx = Crafty.canvasLayer.context;
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0,
				Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
});

Crafty.c("Square", {
	// This function will be called when the component is added to an entity
	// So it sets up the things that both our entities had in common
	init : function() {
		this.addComponent("2D, Canvas, Color");
		this.w = 52;
		this.h = 52;
	},

	// Our two entities had different positions,
	// so we define a method for setting the position
	place : function(x, y) {
		this.x = x;
		this.y = y;

		// There's no magic to method chaining.
		// To allow it, we have to return the entity!
		return this;
	}
});

Crafty.c("Circle", {
	circle : function(radius, color) {
		this.radius = radius;
		this.w = this.h = radius * 2;
		this.color = color || "#000000";

		return this;
	},

	draw : function() {
		var ctx = Crafty.canvasLayer.context;
		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0,
				Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
});