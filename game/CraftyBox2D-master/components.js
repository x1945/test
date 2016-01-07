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

Crafty.c("hurt", {
	init : function() {
		// this.addComponent("2D, Canvas, Text");
		// this.addComponent("2D, Canvas, Tween, Text");
		this.addComponent("2D, DOM, Tween, Text");
	},
	display : function(text, color, x, y, z) {
		this.origin("center");
		this.text(text);
		// this.color = color;
		this.textColor(color);
		this.textFont({
			size : '30px'
		});
		// this._strength = 0.5;
		this.attr({
			x : x,
			y : y,
			z : z,
			alpha : 0.3,
		}).tween({
			y : y - 60,
			alpha : 1.0
		}, 1000).timeout(function() {
			this.destroy();
			this.isDestory = true;
		}, 1000);
		return this;
	}
});

Crafty.c("hurtX", {
	init : function() {
		this.addComponent("2D, Canvas, Text");
	},
	count : 0,
	display : function(text, color, x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.text(text);
		this.color = color;
		this.textColor(this.color);
		this._strength = 0.5;
		return this;
	},
	events : {
		"EnterFrame" : function() {
			this.x--;
			this.y -= 2;
			if (this.count++ < 30) {
				if (this.count < 15) {
					this._strength += 0.05;
				} else {
					this._strength -= 0.05;
				}
				this.textFont({
					size : (this.count + 10) + 'px'
				});
				this.textColor(this.color);
			} else {
				this.destroy();
				this.isDestory = true;
			}
		}
	}
});

Crafty.c("SquareA", {
	// This function will be called when the component is added to an entity
	// So it sets up the things that both our entities had in common
	init : function() {
		// this.addComponent("2D, DOM, Canvas, Color");
		this.addComponent("2D, Canvas, Color");
		this.color("rgba(255, 0, 0, 0.2)");
		// this.css('border', '3px #cccccc solid;');
		this.w = size;
		this.h = size;
		this.z = -1;
		this.origin("center");
	},
	events : {
		// bind the given function to the blush event
		"EnterFrame" : function() {
			// this.rotation = this.rotation + 1;
		}
	}
});

Crafty.c("Square", {
	// This function will be called when the component is added to an entity
	// So it sets up the things that both our entities had in common
	init : function() {
		// this.addComponent("2D, DOM, Canvas, Color");
		this.addComponent("2D, Canvas, Color");
		this.color("rgba(255, 0, 0, 0.4)");
		// this.css('border', '3px #cccccc solid;');
		this.w = size + 4;
		this.h = size + 4;
		this.z = -1;
		this.origin("center");
	}
});

Crafty.c("icon", {
	init : function() {
		this.addComponent("2D, Canvas, Color");
	},

	set : function(name) {
		this.addComponent(name);
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

Crafty.c("Hoverable", {
	_baseColor : 'gray',
	_hoverColor : 'lightgray',
	init : function() {
		this.requires('Color, Mouse');
		this.color(this._baseColor);
		this.bind("MouseOver", function(e) {
			this._baseColor = this.color();
			this.color(this._hoverColor);
		});
		this.bind("MouseOut", function(e) {
			this.color(this._baseColor);
		});
	},
	hoverColor : function(newColor) {
		this._hoverColor = newColor;
		return this;
	}
});

Crafty.c("Button", {
	init : function() {
		this.requires('DOM, 2D, Mouse, Hoverable');
		this.css({
			"border" : "solid thin black"
		});
		this.attr({
			h : 20,
			w : 60
		});
	}
});

Crafty.c("MenuHeading", {
	init : function() {
		this.requires('DOM, 2D, Color, Text');
		this.color('rgb(200,200,200)');
		this.text("Title");
		this.attr({
			h : 20,
			w : 60
		});
	}
});

Crafty.c("StackerContainer", {
	_stackedItems : null,
	_padding : 15,
	_margin : 5,
	init : function() {
		this.requires('DOM, 2D, Hider');
		this._stackedItems = [];
		this.hide();
	},
	appendItem : function(item) {
		item.addComponent('Hider');
		item.hide();
		this._stackedItems.push(item);
		return this;
	},
	padding : function(size) {
		this._padding = size;
		return this;
	},
	margin : function(size) {
		this._margin = size;
		return this;
	},
	render : function() {
		for (var i = 0; i < this._stackedItems.length; i++) {
			var item = this._stackedItems[i];
			var lastItem = this._stackedItems[i - 1];
			this.stack(item, lastItem);
			this.attach(item);
			if (item.has('StackerContainer')) {
				item.render();
			} else {
				item.show();
			}
		}
		this.show();
		return this;
	},
	removeAll : function() {
		for (var i = 0; i < this._stackedItems.length; i++) {
			this.detach(this._stackedItems[i]);
		}
		return this;
	}
});

Crafty.c("VStackerContainer", {
	init : function() {
		this.requires('StackerContainer');
	},
	stack : function(item, afterItem) {
		item.attr({
			x : afterItem ? afterItem.x : this.x + this._margin,
			y : afterItem ? afterItem.y + afterItem.h + this._padding : this.y
					+ this._margin,
			w : this.w - 2 * this._margin
		});
	}
});

Crafty.c("HStackerContainer", {
	init : function() {
		this.requires('StackerContainer');
	},
	stack : function(item, afterItem) {
		item.attr({
			x : afterItem ? afterItem.x + afterItem.w + this._padding : this.x
					+ this._margin,
			y : afterItem ? afterItem.y : this.y + this._margin,
			h : this.h - 2 * this._margin
		});
	}
});

Crafty.c("Hider", {
	init : function() {
		this.requires('DOM');
	},
	hide : function() {
		this.css({
			display : "none"
		});
		return this;
	},
	show : function() {
		this.css({
			display : ""
		});
		return this;
	}
});

Crafty.c("Shadow", {
	required : "2D, Canvas, Color",
	show : function() {
		var ctx = Crafty.canvasLayer.context;

		// shadow
		// ctx.save();
		ctx.shadowColor = '#333';
		ctx.shadowBlur = 5;
		ctx.shadowOffsetX = 5;
		ctx.shadowOffsetY = 5;
		// ctx.fill();

		// ctx.save();
		// ctx.fillStyle = this.color;
		// ctx.beginPath();
		// ctx.arc(this.x + this.radius, this.y + this.radius, this.radius, 0,
		// Math.PI * 2);
		// ctx.closePath();
		// ctx.fill();
	}
});

Crafty.c("blood", {
	init : function() {
		this.addComponent("2D, Canvas, Color");
	},
	detail : {},
	value : 0,
	maxValue : 0,
	set : function(option) {
		option = $.extend({
			type : 'HP',
			x : 0,
			y : 0,
			w : 0,
			h : 5
		}, option);

		this.color('rgba(0, 0, 0, 0.3)');
		this.attr({
			x : option.x,
			y : option.y,
			w : option.w,
			h : option.h
		});

		var shadow = Crafty.e("2D, Canvas, Color");
		shadow.attr({
			x : option.x + 1,
			y : option.y + 1,
			maxW : option.w - 2,
			h : option.h - 2
		});
		switch (option.type) {
		case 'HP':
			shadow.color('rgba(255, 0, 0, 0.6)');
			break;
		case 'SP':
			shadow.color('rgba(0, 0, 255, 0.6)');
			break;
		}
		this.detail = shadow;
		this.attach(shadow);
		return this;
	},
	getValue : function() {
		return this.value;
	},
	setValue : function(v) {
		this.value = v || 0;
		this.planning();
	},
	setMaxValue : function(v) {
		this.maxValue = v || 0;
		this.planning();
	},
	planning : function() {
		if (this.value > this.maxValue)
			this.value = this.maxValue;
		if (this.maxValue != 0 && this.detail) {
			this.detail.w = this.detail.maxW
					* ((this.value || 0) / this.maxValue);
		}
	},
	events : {
	// "EnterFrame" : function() {
	// }
	}
});