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
			// if (this._parent) {
			// this.z = this._parent.z - 1;
			// }
			// console.log('EnterFrame', this._parent, this.z);
			this.rotation = this.rotation + 1;
		}
	}
});

Crafty.c("Square1", {
	// This function will be called when the component is added to an entity
	// So it sets up the things that both our entities had in common
	init : function() {
		// this.addComponent("2D, DOM, Canvas, Color");
		this.addComponent("2D, Canvas, Color");
		this.color("rgba(0, 255, 0, 0.2)");
		this.z = -1;
		// this.css('border', '3px #cccccc solid;');
		this.w = size;
		this.h = size;
		this.origin("center");
	},
	events : {
	// bind the given function to the blush event
	 "EnterFrame" : function() {
			// if (this._parent) {
			// this.z = this._parent.z - 1;
			//			}
			this.rotation = this.rotation + 2;
		}
	}
});

Crafty.c("Square2", {
	// This function will be called when the component is added to an entity
	// So it sets up the things that both our entities had in common
	init : function() {
		// this.addComponent("2D, DOM, Canvas, Color");
		this.addComponent("2D, Canvas, Color");
		this.color("rgba(0, 0, 255, 0.2)");
		this.z = -1;
		// this.css('border', '3px #cccccc solid;');
		this.w = size;
		this.h = size;
		this.origin("center");
	},
	events : {
	// bind the given function to the blush event
	 "EnterFrame" : function() {
			// if (this._parent) {
			// this.z = this._parent.z - 1;
			//			}
			this.rotation = this.rotation + 3;
		}
	}
});

Crafty.c("icon", {
	init : function() {
		this.addComponent("2D, Canvas, Color");
	},

	// events : {
	// bind the given function to the blush event
	// "EnterFrame" : function() {
	// if (this._parent) {
	// this.z = this._parent.z + 1;
	// }
	// }
	// },

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