var attackStepSecond = 50;

// 魔法陣
Crafty.c("attackHexagram", {
	init : function() {
		this.addComponent("2D, Canvas, SpriteAnimation, Hexagram");
		this.origin("center");
		var s = 100;
		var iceArray = [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ] ];
		this.reel("ice", iceArray.length * s, iceArray);
		var fireArray = [ [ 3, 2 ], [ 4, 2 ], [ 5, 2 ] ];
		this.reel("wind", fireArray.length * s, fireArray);
		var windArray = [ [ 6, 2 ], [ 7, 2 ], [ 8, 2 ] ];
		this.reel("fire", windArray.length * s, windArray);
		var lightArray = [ [ 9, 2 ], [ 10, 2 ], [ 11, 2 ] ];
		this.reel("light", lightArray.length * s, lightArray);
		// var darkArray = [ [ 6, 4 ], [ 7, 4 ], [ 8, 4 ], [ 6, 5 ], [ 7, 5 ],
		// [ 8, 5 ], [ 6, 6 ], [ 7, 6 ], [ 8, 6 ], [ 6, 7 ], [ 7, 7 ],
		// [ 8, 7 ] ];
		var darkArray = [ [ 6, 6 ], [ 7, 6 ], [ 8, 6 ] ];
		this.reel("dark", darkArray.length * s, darkArray);

	},
	play : function(name) {
		this.animate(name, -1);
		return this;
	},
	count : 0,
	events : {
		"EnterFrame" : function() {
			// this.body.SetAngularVelocity(20);
			// this.body.ApplyTorque(new b2Vec2(10, 0));
			// this.body.ApplyAngularImpulse( 100 );
			// this.body.rotation ++;

			// 飛出邊界
			if (this.x > 320 || this.x < -20 || this.y > 420 || this.y < -20) {
				// console.log('attackHexagram destory');
				world.DestroyBody(this.body);
				this.destroy();
			}
		}
	}
});

// 攻擊效果
Crafty.c("attackFlame", {
	init : function() {
		this.addComponent("2D, Canvas, SpriteAnimation, Flame");
		this.origin("center");
		var s = 100;
		var flame1Array = [ [ 6, 4 ], [ 6, 5 ], [ 6, 6 ] ];
		this.reel("flame1", flame1Array.length * s, flame1Array);
		var flame2Array = [ [ 7, 4 ], [ 7, 5 ], [ 7, 6 ] ];
		this.reel("flame2", flame2Array.length * s, flame2Array);
		var flame3Array = [ [ 8, 4 ], [ 8, 5 ], [ 8, 6 ] ];
		this.reel("flame3", flame3Array.length * s, flame3Array);
		var flame4Array = [ [ 9, 4 ], [ 10, 4 ], [ 11, 4 ] ];
		this.reel("flame4", flame4Array.length * s, flame4Array);
		var flame5Array = [ [ 9, 5 ], [ 10, 5 ], [ 11, 5 ] ];
		this.reel("flame5", flame5Array.length * s, flame5Array);
	},
	play : function(name) {
		this.animate(name, -1);
		return this;
	},
	v : {
		x : 0,
		y : 0
	},
	events : {
		"EnterFrame" : function() {
			// this.body.rotation++;
			// this.body.ApplyImpulse(new b2Vec2(0, -2 / PTM_RATIO), this.body
			// .GetWorldCenter());
			this.body.ApplyImpulse(new b2Vec2(this.v.x / PTM_RATIO, this.v.y / PTM_RATIO), this.body.GetWorldCenter());

			// 飛出邊界
			if (this.x > 320 || this.x < -20 || this.y > 420 || this.y < -20) {
				world.DestroyBody(this.body);
				this.destroy();
			}
		}
	}
});

// 攻擊效果
Crafty.c("attackFlame2", {
	init : function() {
		this.addComponent("2D, Canvas, Tween, SpriteAnimation, Flame");
		this.origin("center");
		var s = 100;
		var flame1Array = [ [ 6, 4 ], [ 6, 5 ], [ 6, 6 ] ];
		this.reel("flame1", flame1Array.length * s, flame1Array);
		var flame2Array = [ [ 7, 4 ], [ 7, 5 ], [ 7, 6 ] ];
		this.reel("flame2", flame2Array.length * s, flame2Array);
		var flame3Array = [ [ 8, 4 ], [ 8, 5 ], [ 8, 6 ] ];
		this.reel("flame3", flame3Array.length * s, flame3Array);
		var flame4Array = [ [ 9, 4 ], [ 10, 4 ], [ 11, 4 ] ];
		this.reel("flame4", flame4Array.length * s, flame4Array);
		var flame5Array = [ [ 9, 5 ], [ 10, 5 ], [ 11, 5 ] ];
		this.reel("flame5", flame5Array.length * s, flame5Array);
	},
	play : function(option) {
		this.x = option.sx * gv.size + this.w / 2;
		this.y = option.sy * gv.size + this.h / 2;

		this.tween({
			x : option.ex * gv.size + this.w / 2,
			y : option.ey * gv.size + this.h / 2
		// rotation : 90
		}, option.second || 100).timeout(function() {
			this.destroy();
		}, option.second || 100);
		this.animate(option.name, -1);
		return this;
	}
});

// main
Crafty.c("attackAnimation", {
	exeSecond : 1000,
	init : function() {
		this.addComponent("2D, Canvas, SpriteAnimation");
		this.origin("center");
	},
	setAnimation : function(componentName, animationArray) {
		this.addComponent(componentName);
		this.exeSecond = animationArray.length * attackStepSecond;
		this.reel("attackAction", this.exeSecond, animationArray);
		return this;
	},
	playAnimation : function(value) {
		var v = value || 1;
		this.animate("attackAction", v);
		if (v != -1) {
			this.timeout(function() {
				this.destroy();
			}, this.exeSecond * v);
			return this;
		}
	}
// events : {
// "EnterFrame" : function() {
// if (!this.isPlaying('attackAction')) {
// this.destroy();
// }
// }
// }
});

Crafty.c("exeAttack1", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Attack1", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeAttack2", {
	init : function() {
		this.addComponent("attackAnimation");
		this
				.setAnimation("Attack2", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ],
						[ 2, 1 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeAttack3", {
	init : function() {
		this.addComponent("attackAnimation");
		// this.setAnimation("Attack3", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0
		// ],
		// [ 4, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ] ]);
		this
				.setAnimation("Attack3", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ],
						[ 2, 1 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeAttack4", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Attack4", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeAttack5", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Attack5", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeMeteor", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Meteor", [ [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ], [ 4, 3 ], [ 0, 4 ], [ 1, 4 ] ]);
		// this.setAnimation("Meteor", [ [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ],
		// [ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ],
		// [ 3, 2 ], [ 4, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ],
		// [ 4, 3 ], [ 0, 4 ], [ 1, 4 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeDarkness1", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Darkness1", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ],
				[ 2, 1 ], [ 3, 1 ] ]);
		// this.setAnimation("Darkness1", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ],
		// [ 3, 0 ], [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 0, 0 ],
		// [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ],
		// [ 2, 1 ], [ 3, 1 ] ]);
		// this.setAnimation("Darkness1", [ [ 3, 1 ], [ 2, 1 ], [ 1, 1 ],
		// [ 0, 1 ], [ 4, 0 ], [ 3, 0 ], [ 2, 0 ], [ 1, 0 ], [ 0, 0 ],
		// [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ],
		// [ 2, 1 ], [ 3, 1 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeLight7", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Light7", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ],
				[ 3, 1 ], [ 4, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ],
				[ 3, 3 ], [ 4, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ],
				[ 3, 5 ], [ 4, 5 ] ]);
		this.playAnimation(-1);
	}
});

Crafty.c("exeIce3", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Ice3", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeIce32", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Ice3", [ [ 3, 1 ], [ 4, 1 ], [ 0, 2 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeHeal1", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Heal1", [ [ 3, 3 ], [ 4, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 0, 5 ],
				[ 1, 5 ], [ 2, 5 ], [ 3, 5 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeHeal2", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Heal2", [ [ 4, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ] ]);
		this.playAnimation(-1);
	}
});

Crafty.c("exeHeal4", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Heal4", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ],
				[ 3, 1 ], [ 4, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ],
				[ 3, 3 ], [ 4, 3 ], [ 0, 4 ], [ 1, 4 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeHeal6", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Heal6", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ],
				[ 3, 1 ], [ 4, 1 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeHeal62", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Heal6", [ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ], [ 3, 2 ], [ 4, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ],
				[ 3, 3 ], [ 4, 3 ], [ 0, 4 ], [ 1, 4 ], [ 2, 4 ], [ 3, 4 ], [ 4, 4 ], [ 0, 5 ], [ 1, 5 ], [ 2, 5 ],
				[ 3, 5 ], [ 4, 5 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeState6",
		{
			init : function() {
				this.addComponent("attackAnimation");
				this.setAnimation("State6", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ],
						[ 2, 1 ] ]);
				this.playAnimation();
			}
		});
