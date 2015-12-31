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

// main
Crafty.c("attackAnimation", {
	init : function() {
		this.addComponent("2D, Canvas, SpriteAnimation");
		this.origin("center");
	},
	setAnimation : function(componentName, animationArray) {
		this.addComponent(componentName);
		this.reel("attackAction", animationArray.length * attackStepSecond,
				animationArray);
		return this;
	},
	playAnimation : function() {
		this.animate("attackAction", 1);
		return this;
	},
	events : {
		"EnterFrame" : function() {
			if (!this.isPlaying('attackAction')) {
				this.destroy();
			}
		}
	}
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
		this.setAnimation("Attack2", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ],
				[ 4, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeAttack3", {
	init : function() {
		this.addComponent("attackAnimation");
		// this.setAnimation("Attack3", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0
		// ],
		// [ 4, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ] ]);
		this.setAnimation("Attack3", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ],
				[ 4, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeAttack4", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Attack4", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ],
				[ 4, 0 ], [ 0, 1 ], [ 1, 1 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeAttack5", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Attack5", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ],
				[ 4, 0 ], [ 0, 1 ], [ 1, 1 ] ]);
		this.playAnimation();
	}
});

Crafty.c("exeMeteor", {
	init : function() {
		this.addComponent("attackAnimation");
		this.setAnimation("Meteor", [ [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ],
				[ 4, 3 ], [ 0, 4 ], [ 1, 4 ] ]);
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
		this.setAnimation("Darkness1", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ],
				[ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ] ]);
		this.playAnimation();
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