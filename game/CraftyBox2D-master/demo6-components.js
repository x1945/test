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
		console.log('option:', option);
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
