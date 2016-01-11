//
Crafty.c("BorderBox", {
	init : function() {
		this.addComponent("2D, Canvas, Color");
		this.bind("Draw", this._drawBorderBox);
		this.ready = true;
	},
	_drawBorderBox : function(e) {
		e.ctx.lineWidth = 1;
		e.ctx.strokeStyle = 'black';
		e.ctx.strokeRect(e.pos._x, e.pos._y, e.pos._w, e.pos._h);
	}
});

//
Crafty.c("overflow", {
	init : function() {
		this.addComponent("2D, Canvas, Color");
		this.bind("Draw", this._drawBorderBox);
		this.ready = true;
	},
	_drawBorderBox : function(e) {
		e.ctx.lineWidth = 1;
		e.ctx.strokeStyle = 'black';
		e.ctx.strokeRect(e.pos._x, e.pos._y, e.pos._w, e.pos._h);
	}
});

// 消失
Crafty.c("dead", {
	required : "2D, Canvas, Color",
	init : function() {
		this.addComponent("Tween");
		// this.origin("center");
	},
	toDead : function() {
		this.tween({
			alpha : 0.0
		}, 500).timeout(function() {
			world.DestroyBody(this.body);
			this.destroy();
		}, 500);

		this.dead = true;
	},
	// count : 0,
	// dead : false,
	events : {
		"EnterFrame" : function() {
			if (this.dead) {
				// if (this.count++ < 10) {
				this.w += 2;
				this.h += 2;
				// this.alpha -= 0.1;
				this.body.SetPosition({
					x : (this.x - 1) / PTM_RATIO,
					y : (this.y - 1) / PTM_RATIO
				});
				// } else {
				// world.DestroyBody(this.body);
				// this.destroy();
				// }
			}
		}
	}
});

// 計時器
Crafty.c("timing", {
	init : function() {
		this.addComponent("2D, Canvas, Color, Tween");
		this.color('rgba(0, 255, 255, 0.3)');
	},
	exe : function(option) {
		this.attr({
			x : option.x,
			y : option.y,
			w : option.w,
			h : option.h
		}).tween({
			w : 0
		}, option.second || 5000).timeout(function() {
			this.destroy();
			if (option.callback) {
				option.callback();
			}
		}, option.second || 5000);

		return this;
	}
});

Crafty.c("locking", {
	init : function() {
		// this.addComponent("2D, DOM, Tween");
		this.addComponent("2D, DOM, Tween");
		// this.addComponent("2D, DOM, Canvas, Color, Tween");
	},
	exe : function(option) {
		// console.log('option:', option);
		this.attr({
			x : option.x * gv.size - gv.size / 2,
			y : option.y * gv.size - gv.size / 2,
			w : gv.size * 2,
			h : (option.h * gv.size) + gv.size
		}).css({
			'border' : '1px solid ' + (option.color || 'red'),
		});
		this.tween({
			x : option.x * gv.size,
			y : option.y * gv.size,
			w : gv.size,
			h : option.h * gv.size,
		// rotation : 90
		}, option.second || 200).timeout(function() {
			this.destroy();
			if (option.callback) {
				option.callback();
			}
		}, option.second || 1000);

		this.origin("center");
		return this;
	}
// ,events : {
// "EnterFrame" : function() {
// if (this.x < gv.size) {
// this.rotation = (this.rotation + 10) % 360;
// this.x += 3;
// this.y += 3;
// this.h -= 6;
// this.w -= 6;
// this.origin("center");
// } else {
// this.destroy();
// }
// }
// }
});

Crafty.c("heroAnimation", {
	init : function() {
		this.addComponent("2D, Canvas, Tween");
	},
	play : function(option) {
		console.log('heroAnimation:', option);
		this.addComponent(option.png);
		this.w = gv.size * 6;
		this.h = gv.size * 6;
		this.alpha = 0.0;

		switch (option.type) {
		case 'up':
			this.x = 0;
			this.y = -2 * gv.size;
			this.z = 10000;

			this.tween({
				y : -1 * gv.size,
				alpha : 1.0
			}, option.second || 300).timeout(function() {
				this.tween({
					y : -0.5 * gv.size
				}, 500).timeout(function() {
					this.tween({
						y : 6 * gv.size,
						alpha : 0.0
					}, 200).timeout(function() {
						this.destroy();
					}, 200);
				}, 500);

			}, 300);
			// 700

			break;
		case 'down':
			this.x = 0;
			this.y = 3 * gv.size;
			this.z = 10001;

			this.tween({
				y : 2 * gv.size,
				alpha : 1.0
			}, option.second || 200).timeout(function() {
				this.tween({
					y : 1.5 * gv.size
				}, 500).timeout(function() {
					this.tween({
						y : -5 * gv.size,
						alpha : 0.0
					}, 200).timeout(function() {
						this.destroy();
					}, 200);
				}, 500);
			}, 200);

			break;
		}

		// this.origin("center");
		return this;
	}
// ,
// events : {
// "EnterFrame" : function() {
// }
// }
});

Crafty.c("lockingSquare", {
	init : function() {
		// this.addComponent("2D, DOM, Canvas, Color");
		this.addComponent("2D, Canvas, Color");
		this.color("rgba(255, 255, 0, 0.1)");
	}
});