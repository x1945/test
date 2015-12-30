var attackStepSecond = 50;
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
		this.setAnimation("Attack3", [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ], [ 3, 0 ],
				[ 4, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 3, 1 ], [ 4, 1 ] ]);
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
		// this.setAnimation("Meteor", [ [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ],
		// [ 4, 3 ], [ 0, 4 ], [ 1, 4 ] ]);
		this.setAnimation("Meteor", [ [ 3, 0 ], [ 4, 0 ], [ 0, 1 ], [ 1, 1 ],
				[ 2, 1 ], [ 3, 1 ], [ 4, 1 ], [ 0, 2 ], [ 1, 2 ], [ 2, 2 ],
				[ 3, 2 ], [ 4, 2 ], [ 0, 3 ], [ 1, 3 ], [ 2, 3 ], [ 3, 3 ],
				[ 4, 3 ], [ 0, 4 ], [ 1, 4 ] ]);
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