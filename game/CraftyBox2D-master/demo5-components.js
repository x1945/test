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