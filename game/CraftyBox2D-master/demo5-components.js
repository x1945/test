// 消失
Crafty.c("dead", {
	required : "2D, Canvas, Color",
	init : function() {

	},
	toDead : function() {
		this.dead = true;
	},
	count : 0,
	dead : false,
	events : {
		"EnterFrame" : function() {
			if (this.dead) {
				if (this.count++ < 10) {
					// this.x -= 2;
					// this.y -= 2;
					// this.body.x--;
					// this.body.y--;
					this.w += 2;
					this.h += 2;
					this.alpha -= 0.1;
					this.body.SetPosition({
						x : (this.x - 1) / PTM_RATIO,
						y : (this.y - 1) / PTM_RATIO
					});
				} else {
					// console.log(this);
					world.DestroyBody(this.body);
					this.destroy();
					// objects[this.p.x][this.p.y] = null;
				}
			}
		}
	}
});