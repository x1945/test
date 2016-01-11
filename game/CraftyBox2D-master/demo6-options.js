// game variable
var gv = {
	PTM_RATIO : 32,
	shape : 'circle',
	r : 0.51,
	size : 64,
	hero : [],
	enemyData : [],
	enemy : [],
	objects : [],
	heroAnimationPlaying : false, // 英雄動畫播放中
	enemyAnimationPlaying : false, // 敵人動畫播放中
	attackAnimationPlaying : false, // 攻擊動畫播放中
	test : ''
};

// 設定
var game = {
	/**
	 * 初始化
	 */
	init : function() {
		// 建立二維物件陣列
		gv.objects = [];
		for (var x = 0; x < 6; x++) {
			gv.objects[x] = [];
			for (var y = 0; y < 9; y++) {
				gv.objects[x][y] = null;
			}
		}
		// load png
		Crafty.sprite(512, "img/1066.png", {
			hero1png : [ 0, 0 ]
		});
		Crafty.sprite(512, "img/1067.png", {
			hero2png : [ 0, 0 ]
		});
		Crafty.sprite(512, "img/1068.png", {
			hero3png : [ 0, 0 ]
		});
		Crafty.sprite(512, "img/1046.png", {
			hero4png : [ 0, 0 ]
		});
		Crafty.sprite(512, "img/1047.png", {
			hero5png : [ 0, 0 ]
		});
		Crafty.sprite(512, "img/1048.png", {
			hero6png : [ 0, 0 ]
		});

		Crafty.sprite(100, "icon/1066.png", {
			hero1 : [ 0, 0 ]
		});
		Crafty.sprite(100, "icon/1067.png", {
			hero2 : [ 0, 0 ]
		});
		Crafty.sprite(100, "icon/1068.png", {
			hero3 : [ 0, 0 ]
		});
		Crafty.sprite(100, "icon/1046.png", {
			hero4 : [ 0, 0 ]
		});
		Crafty.sprite(100, "icon/1047.png", {
			hero5 : [ 0, 0 ]
		});
		Crafty.sprite(100, "icon/1048.png", {
			hero6 : [ 0, 0 ]
		});

		Crafty.sprite(100, "icon/461.png", {
			enemy1 : [ 0, 0 ]
		});
		Crafty.sprite(100, "icon/462.png", {
			enemy2 : [ 0, 0 ]
		});
		Crafty.sprite(100, "icon/463.png", {
			enemy3 : [ 0, 0 ]
		});
		Crafty.sprite(100, "icon/464.png", {
			enemy4 : [ 0, 0 ]
		});
		Crafty.sprite(100, "icon/465.png", {
			enemy5 : [ 0, 0 ]
		});

		Crafty.sprite(600, 800, "img/f181.png", {
			boss : [ 0, 0 ]
		});

		Crafty.sprite(64, "icon/spinning-sword.png", {
			knife : [ 0, 0 ]
		});
		Crafty.sprite(64, "icon/checked-shield.png", {
			shield : [ 0, 0 ]
		});
		Crafty.sprite(64, "icon/james-bond-aperture.png", {
			fairy : [ 0, 0 ]
		});
		Crafty.sprite(64, "icon/electric.png", {
			electric : [ 0, 0 ]
		});

		// characteristic
		Crafty.sprite(24, "img/IconSet.png", {
			characteristic0 : [ 8, 11 ],
			characteristic1 : [ 9, 11 ],
			characteristic2 : [ 10, 11 ],
			characteristic3 : [ 11, 11 ],
			characteristic4 : [ 12, 11 ],
			characteristic5 : [ 13, 11 ],
			characteristic6 : [ 14, 11 ],
			characteristic7 : [ 15, 11 ],
			characteristic8 : [ 16, 11 ]
		});

		// Hexagram
		Crafty.sprite(32, "img/Hexagram.png", {
			Hexagram : [ 0, 0 ]
		});

		// Flame
		Crafty.sprite(32, "img/Flame.png", {
			Flame : [ 0, 0 ]
		});

		// status
		Crafty.sprite(32, "Animations/Balloon.png", {
			status0 : [ 0, 0 ],
			status1 : [ 0, 1 ],
			status2 : [ 0, 2 ],
			status3 : [ 0, 3 ],
			status4 : [ 0, 4 ],
			status5 : [ 0, 5 ],
			status6 : [ 0, 6 ],
			status7 : [ 0, 7 ],
			status8 : [ 0, 8 ]
		});

		// attack1
		Crafty.sprite(192, "Animations/Attack1.png", {
			Attack1 : [ 0, 0 ]
		});
		// attack2
		Crafty.sprite(192, "Animations/Attack2.png", {
			Attack2 : [ 0, 0 ]
		});
		// attack3
		Crafty.sprite(192, "Animations/Attack3.png", {
			Attack3 : [ 0, 0 ]
		});
		// attack4
		Crafty.sprite(192, "Animations/Attack4.png", {
			Attack4 : [ 0, 0 ]
		});
		// attack5
		Crafty.sprite(192, "Animations/Attack5.png", {
			Attack5 : [ 0, 0 ]
		});
		// Darkness1
		Crafty.sprite(192, "Animations/Darkness1.png", {
			Darkness1 : [ 0, 0 ]
		});
		// Light7
		Crafty.sprite(192, "Animations/Light7.png", {
			Light7 : [ 0, 0 ]
		});
		// Meteor
		Crafty.sprite(192, "Animations/Meteor.png", {
			Meteor : [ 0, 0 ]
		});
		// ice3
		Crafty.sprite(192, "Animations/Ice3.png", {
			Ice3 : [ 0, 0 ]
		});
		// Heal1
		Crafty.sprite(192, "Animations/Heal1.png", {
			Heal1 : [ 0, 0 ]
		});
		// Heal4
		Crafty.sprite(192, "Animations/Heal4.png", {
			Heal4 : [ 0, 0 ]
		});
		// Heal2
		Crafty.sprite(192, "Animations/Heal2.png", {
			Heal2 : [ 0, 0 ]
		});
		// Heal6
		Crafty.sprite(192, "Animations/Heal6.png", {
			Heal6 : [ 0, 0 ]
		});
		// Heal6
		Crafty.sprite(192, "Animations/State6.png", {
			State6 : [ 0, 0 ]
		});
	},
	/**
	 * 邊牆
	 */
	createWalls : function() {
		var thickness = 50;
		// 邊牆
		// density : 0, // 1.0 質量[旋轉](設置密度密度為0，即表示該剛體是靜止不動的)
		// friction : 0, // 2 表面摩擦力
		// restitution : 0, //彈性系數，1應該就是不衰減，大於1反而越來越快
		var walls = Crafty.e("2D, Canvas, Color, Box2D, walls").attr({
			x : 0,
			y : 0
		}).box2d({
			bodyType : 'static',
			density : 1.0,
			friction : 10,
			restitution : 0,
			shape : [ [ 0, 0 ], [ w, 0 ] ]
		});
		walls.addFixture({
			bodyType : 'static',
			density : 1.0,
			friction : 10,
			restitution : 0,
			shape : [ [ 0, 0 ], [ 0, h ] ]
		// shape : [ [ -thickness, 0 ], [ -thickness, h ], [ 0, h ], [ 0, 0 ] ]
		});
		walls.addFixture({
			bodyType : 'static',
			density : 1.0,
			friction : 10,
			restitution : 0,
			shape : [ [ w, 0 ], [ w, h ] ]
		// shape : [ [ w, 0 ], [ w, h ], [ w + thickness, h ],
		// [ w + thickness, 0 ] ]
		});
		walls.addFixture({
			bodyType : 'static',
			density : 1.0,
			friction : 10,
			restitution : 0,
			shape : [ [ 0, h ], [ w, h ] ]
		// shape : [ [ 0, h ], [ w, h ], [ w, h + thickness ],
		// [ 0, h + thickness ] ]
		});
		walls.addFixture({
			bodyType : 'static',
			density : 1.0,
			friction : 10,
			restitution : 0,
			shape : [ [ 0, 4 * gv.size ], [ 6 * gv.size, 4 * gv.size ],
					[ 6 * gv.size, 5 * gv.size ], [ 0, 5 * gv.size ] ]
		});
	},
	/**
	 * 建立地板
	 */
	createSide : function() {
		for (var x = 0; x < 6; x++) {
			for (var y = 0; y < 4; y++) {
				Crafty.e('BorderBox').attr({
					x : x * gv.size,
					y : y * gv.size, // 0
					h : gv.size,
					w : gv.size,
					z : 0
				});
			}

			for (var y = 5; y < 9; y++) {
				Crafty.e('BorderBox').attr({
					x : x * gv.size,
					y : y * gv.size, // 0
					h : gv.size,
					w : gv.size,
					z : 0
				});
			}
		}
	},

	/**
	 * 建立英雄
	 */
	createHero : function(data) {
		for (var x = 0; x < 6; x++) {
			// var helo = "2D, Canvas,helo" + (x + 1);
			var helo = "2D, Canvas, Mouse, Box2D, hero, Sense, " + "hero"
					+ (x + 1);
			var r = Crafty.e(helo).origin("center");
			var y = 8;
			var fallingElement = r.attr({
				p : {
					x : x,
					y : y
				},
				png : 'hero' + (x + 1) + 'png',
				x : x * gv.size,
				y : y * gv.size, // 0
				h : gv.size,
				w : gv.size,
				r : gv.r
			}).box2d({
				isSensor : true, // 傳感器(default:true, 碰撞時反饋
				// categoryBits : (i % 2 == 0 ? 2 : 4),
				// maskBits : (i % 2 == 0 ? 3 : 5),
				// groupIndex : i % 3,
				// bodyType : i % 2 == 0 ? 'static' : 'dynamic', // dynamic
				// bodyType : 'dynamic', // dynamic
				// bodyType : 'static', // static
				density : 0, // 1.0 質量[旋轉](設置密度密度為0，即表示該剛體是靜止不動的)
				friction : 0, // 2 表面摩擦力
				restitution : 0, // 0.2 表面張力[彈力](這個值越大，剛體越硬) 彈力
				shape : gv.shape
			}).onContact("Sense", game.contactSense);

			var hp = Crafty.e('blood').set({
				type : 'HP',
				x : x * gv.size + 5,
				y : y * gv.size + gv.size - 15,
				h : 4,
				w : gv.size - 10
			});
			var sp = Crafty.e('blood').set({
				type : 'SP',
				x : x * gv.size + 5,
				y : y * gv.size + gv.size - 10,
				h : 4,
				w : gv.size - 10
			});
			r.attach(hp);
			hp.setMaxValue(9999);
			hp.setValue(Crafty.math.randomInt(0, 9999));
			r.attach(sp);
			sp.setMaxValue(999);
			sp.setValue(Crafty.math.randomInt(0, 999));

			// 我方
			gv.hero.push(fallingElement);

			// 放入二維陣列
			gv.objects[x][y] = fallingElement;
		}
	},
	/**
	 * 建置敵人
	 */
	createEnemy : function() {
		//
		gv.enemyData = [ {
			type : 'enemy1',
			x : 0,
			y : 0
		}, {
			type : 'enemy2',
			x : 2,
			y : 0
		}, {
			type : 'enemy3',
			x : 4,
			y : 0
		}, {
			type : 'enemy4',
			x : 1,
			y : 1
		}, {
			type : 'enemy5',
			x : 3,
			y : 1
		}, {
			type : 'enemy1',
			x : 5,
			y : 1
		}, {
			type : 'enemy2',
			x : 0,
			y : 2
		}, {
			type : 'enemy3',
			x : 2,
			y : 2
		}, {
			type : 'enemy4',
			x : 4,
			y : 2
		}, {
			type : 'enemy5',
			x : 1,
			y : 3
		}, {
			type : 'enemy1',
			x : 3,
			y : 3
		}, {
			type : 'enemy2',
			x : 5,
			y : 3
		} ];

		Crafty.e("Delay").delay(function() {
			var data = gv.enemyData.shift();
			var efficacy = Crafty.e("exeDarkness1");
			efficacy.attr({
				x : (data.x * gv.size) + (gv.size / 2) - efficacy.w / 2,
				y : (data.y * gv.size) + (gv.size / 2) - efficacy.h / 2,
				z : (data.z || 10) + 1
			});
			// console.log(efficacy.exeSecond);
			// .origin("center");
			// Crafty.e("Delay").delay(function() {
			// game.createSingleEnemy(data);
			// }, efficacy.exeSecond, 0);
			game.createSingleEnemy(data);
		}, 100, gv.enemyData.length - 1);
	},
	/**
	 * 建置敵人
	 */
	createSingleEnemy : function(data) {
		var helo = "2D, Canvas, Mouse, Box2D, enemy, Sense";
		var r = Crafty.e(helo).origin("center");
		r.addComponent(data.type);
		var fallingElement = r.attr({
			p : {
				x : data.x,
				y : data.y
			},
			x : data.x * gv.size,
			y : data.y * gv.size, // 0
			h : gv.size,
			w : gv.size,
			r : gv.r
		}).box2d({
			isSensor : true, // 傳感器(default:true, 碰撞時反饋
			// categoryBits : (i % 2 == 0 ? 2 : 4),
			// maskBits : (i % 2 == 0 ? 3 : 5),
			// groupIndex : i % 3,
			// bodyType : i % 2 == 0 ? 'static' : 'dynamic', // dynamic
			// bodyType : 'dynamic', // dynamic
			// bodyType : 'static', // static
			density : 0, // 1.0 質量[旋轉](設置密度密度為0，即表示該剛體是靜止不動的)
			friction : 0, // 2 表面摩擦力
			restitution : 0, // 0.2 表面張力[彈力](這個值越大，剛體越硬) 彈力
			shape : gv.shape
		}).onContact("Sense", game.contactSense);

		var hp = Crafty.e('blood').set({
			type : 'HP',
			x : data.x * gv.size + 5,
			y : data.y * gv.size + gv.size - 15,
			h : 4,
			w : gv.size - 10
		});
		r.attach(hp);
		hp.setMaxValue(9999);
		hp.setValue(9999);

		// 敵方
		gv.enemy.push(fallingElement);

		// 放入二維陣列
		gv.objects[data.x][data.y] = fallingElement;
	},
	/**
	 * 建置感應區
	 */
	createSense : function() {
		var b = false;
		for (var x = 0; x < 6; x++) {
			for (var y = 0; y < 9; y++) {
				if (gv.objects[x][y] == null) {
					var role = "2D, Canvas, Color, Box2D, Sense";
					var r = Crafty.e(role); // .origin("center");
					var box = r.attr({
						p : {
							x : x,
							y : y
						},
						actionType : 'test',
						x : x * gv.size,
						y : y * gv.size, // 0
						h : gv.size,
						w : gv.size,
						r : gv.r
					}).box2d({
						isSensor : true, // 傳感器(default:true, 碰撞時反饋
						density : 0, // 1.0 質量[旋轉](設置密度密度為0，即表示該剛體是靜止不動的)
						friction : 0, // 2 表面摩擦力
						restitution : 0, // 0.2 表面張力[彈力](這個值越大，剛體越硬) 彈力
						shape : gv.shape
					}).onContact("Sense", game.contactSense);
					if (!b && y >= 5) {
						// box.attach(Crafty.e("exeLight7").attr({
						// x : x * gv.size,
						// y : y * gv.size,
						// h : gv.size,
						// w : gv.size,
						// }));
						// gv.combo = box;
						//
						// Crafty.e("lockingSquare").attr({
						// x : 0,
						// y : y * gv.size,
						// h : gv.size * 4,
						// w : gv.size,
						// z : 1
						// }).bind('EnterFrame', function() {
						// this.x = gv.combo.x;
						// });
						//
						// Crafty.e("lockingSquare").attr({
						// x : 0,
						// y : y * gv.size,
						// h : gv.size,
						// w : gv.size * 6,
						// z : 1
						// }).bind('EnterFrame', function() {
						// this.y = gv.combo.y;
						// });

						// box.attach(Crafty.e("exeHeal2").attr({
						// x : x * gv.size - gv.size,
						// y : y * gv.size - gv.size
						// }));
						b = true;
					}
					gv.objects[x][y] = box;

					// test
					// if (!b) {
					// r.attach(Crafty.e("exeLight7"));
					// b = true;
					// }
				}
			}
		}
	},
	/**
	 * 觸碰感應區
	 */
	contactSense : function(data) {
		if (selectedBody != null) {
			var sName = selectedBody.GetUserData()._entityName;
			var block = data[0].obj;
			var bName = block.body.GetUserData()._entityName;
			if (sName != bName) {
				// 計時器,只執行一次
				if (!isMouseMove && isMouseDown) {
					Crafty.e("timing").exe({
						x : 0,
						y : gv.size * 4,
						w : gv.size * 6,
						h : gv.size
					});
				}

				isMouseMove = true;
				// change array value
				var t1 = gv.objects[finalMovePoint.x][finalMovePoint.y];
				var t2 = gv.objects[block.p.x][block.p.y];
				gv.objects[block.p.x][block.p.y] = t1;
				gv.objects[finalMovePoint.x][finalMovePoint.y] = t2;

				var p = Crafty.clone(finalMovePoint);
				finalMovePoint = Crafty.clone(block.p);
				block.p = p;
				setPosition(block.body, p);
				var data = block.body.GetUserData();
				// 和角色交換才播音效
				if (block.body.GetUserData().has("hero")) {
					Crafty.audio.play("switch");
					var attack = Crafty.e("exeIce3");
					attack.attr({
						x : data.x + gv.size / 2 - attack.w / 2,
						y : data.y + gv.size / 2 - attack.h / 2,
						z : selectedBody.GetUserData().z - 1
					});
				} else {
					// var n = Crafty.math.randomInt(1, 5);
					// var attack = Crafty.e("exeAttack" + n);
					// var attack = Crafty.e("exeMeteor");
					var attack = Crafty.e("exeIce32");
					attack.attr({
						x : data.x + gv.size / 2 - attack.w / 2,
						y : data.y + gv.size / 2 - attack.h / 2,
						z : selectedBody.GetUserData().z - 1
					});
					// Crafty.audio.play("Explosion");
				}
			}
		}
	},
	/**
	 * 測試區
	 */
	testCreate : function() {
		Crafty.e('attackHexagram').attr({
			x : 50,
			y : 15
		}).play('ice');

		Crafty.e('attackHexagram').attr({
			x : 100,
			y : 15
		}).play('fire');

		Crafty.e('attackHexagram').attr({
			x : 150,
			y : 15
		}).play('wind');

		Crafty.e('attackHexagram').attr({
			x : 200,
			y : 15
		}).play('light');

		Crafty.e('attackHexagram').attr({
			x : 250,
			y : 15
		}).play('dark');
	}
};