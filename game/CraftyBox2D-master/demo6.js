var size = 64;
var zIndex = 8;
var world, w = gv.size * 6, h = gv.size * 9, mouseJoint, ctx = this, isMouseDown = false, mouseX, mouseY, mousePVec, selectedBody, selectedFixture;
var hero = [];
var finalMovePoint = {};
var isMouseMove = false;
window.onload = function() {
	gameInit();
};

var gameInit = function() {
	// start crafty
	// Crafty.init(w, h);
	Crafty.init(w, h, document.getElementById('game'));
	// Crafty.canvas.init(); //Crafty.js 0.6.x
	Crafty.canvasLayer.init(); // Crafty.js 0.7.x
	// Init the box2d world, gx = 0, gy = 10
	// Crafty.box2D.init(0, 10, gv.PTM_RATIO, true);
	// 設定無重力
	Crafty.box2D.init(0, 0, gv.PTM_RATIO, true);
	world = Crafty.box2D.world;
	// Start the Box2D debugger
	// Crafty.box2D.showDebugInfo();

	Crafty.scene("loading", function() {
		// Crafty.background("#000000");
		Crafty.e("2D, DOM, Text").attr({
			x : w / 2 - 50,
			y : h / 2 - 10,
			w : 100,
			h : 20
		}).text("Loading").css({
			"text-align" : "center",
			"color" : "#000000"
		});

		Crafty.e("2D, DOM, ProgressBar").attr({
			x : w / 2 - 50,
			y : h / 2 + 10,
			w : 100,
			h : 20,
			z : 100
		})
		// progressBar(Number maxValue, Boolean flipDirection, String
		// emptyColor, String filledColor)
		.progressBar(100, false, "blue", "green").bind("LOADING_PROGRESS",
				function(percent) {
					// updateBarProgress(Number currentValue)
					this.updateBarProgress(percent);
				});

		Crafty.load({
			images : [ "img/1066.png", "img/1067.png", "img/1068.png",
					"img/1046.png", "img/1047.png", "img/1048.png",
					"icon/1066.png", "icon/1067.png", "icon/1068.png",
					"icon/1046.png", "icon/1047.png", "icon/1048.png",
					"icon/461.png", "icon/462.png", "icon/463.png",
					"icon/464.png", "icon/465.png", "img/IconSet.png",
					"icon/spinning-sword.png", "icon/comet-spark.png",
					"icon/checked-shield.png", "icon/james-bond-aperture.png",
					"icon/electric.png", "img/Hexagram.png", "img/Flame.png",
					"img/DarkSpace1.png", "Animations/Attack1.png",
					"Animations/Attack2.png", "Animations/Attack3.png",
					"Animations/Attack4.png", "Animations/Attack5.png",
					"Animations/Darkness1.png", "Animations/Light7.png",
					"Animations/Meteor.png", "Animations/Ice3.png",
					"Animations/Balloon.png", "Animations/Heal1.png",
					"Animations/Heal2.png", "Animations/Heal4.png",
					"Animations/Heal6.png", "Animations/State6.png" ],
			audio : {
				"theme" : [ "audio/theme2.mp3" ],
				"Explosion" : [ "audio/Explosion1.ogg" ],
				"switch" : [ "audio/koma_irekae.mp3" ],
				"Flash2" : [ "audio/Flash2.ogg" ],
				"Heal3" : [ "audio/Heal3.ogg" ],
				"Down2" : [ "audio/Down2.ogg" ]
			}
		}, function() {
			// Crafty.audio.play("theme", -1, 0.3);
			// '#FFFFFF url(img/DarkSpace1.png) no-repeat center center';
			// var bbb = 'url(img/DarkSpace1.png) no-repeat';
			// Crafty.background(bbb);
			console.log('load finish');
			console.log('FPS:', Crafty.timer.FPS());

			game.init();
			Crafty.scene("main");
		}, function(e) { // on progress
			Crafty.trigger("LOADING_PROGRESS", e.percent);
		}, function(e) { // on error
		});
	});
	Crafty.scene("loading");

	Crafty.scene("main", function() {
		generateWorld();

		// 測試區
		// game.testCreate();
	});
}

var generateWorld = function() {
	// Crafty.e("Delay").delay(function() {
	// Crafty.e("heroAnimation").play({
	// type : 'up',
	// png : 'hero1png'
	// });
	// }, 3000, 1);

	// 建立邊牆
	game.createWalls();
	// 建立地板
	game.createSide();
	// 建置英雄
	game.createHero();
	// 建置敵人
	game.createEnemy();
	// 建置感應區
	game.createSense();

	//
	Crafty.addEvent(ctx, "mousedown", function(e) {
		isMouseDown = true;
		isMouseMove = false;
		mousemoved(e);
		Crafty.addEvent(ctx, "mousemove", mousemoved)
	});

	Crafty.addEvent(ctx, "mouseup", function() {
		Crafty.removeEvent(ctx, "mousemove", mousemoved);
		isMouseDown = false;
		mouseX = undefined;
		mouseY = undefined;

		if (selectedBody != null) {
			var attackPoint = Crafty.clone(finalMovePoint);

			var userData = selectedBody.GetUserData()
			userData.p = Crafty.clone(finalMovePoint);

			selectedBody.SetType(b2Body.b2_kinematicBody);
			selectedBody.SetLinearVelocity(new b2Vec2(0, 0));
			// setFixPosition(selectedBody);
			setPosition(selectedBody, finalMovePoint);
			selectedBody = null;

			selectedFixture.SetSensor(true);
			selectedFixture = null;

			// attack
			// attackCreate(attackPoint);
			// for ( var i in hero) {
			// attackCreate(hero[i].p);
			// }

			for ( var i in gv.hero) {
				gv.hero[i].allowAttack = false;
			}
			for (var x = 0; x < 6; x++) {
				for (var y = 8; y >= 5; y--) {
					// for (var x = 0; x < 6; x++) {
					var hero1 = gv.objects[x][y];
					// console.log('x:', x, 'y:', y, 'hero:', hero1.has("hero"),
					// hero1.allowAttack);
					if (hero1.has("hero") && !hero1.allowAttack) {
						if (y == 5) {
							hero1.allowAttack = true;
							waitArray.push({
								x : hero1.p.x,
								y : hero1.p.y,
								h : 1,
								heroes : [ hero1.png ]
							});
						} else {
							var sy = y - 1;
							while (sy >= 5 && !hero1.allowAttack) {
								var hero2 = gv.objects[x][sy];
								// console.log('x:', x, sy, hero2.has("hero"));
								if (hero2.has("hero")) {
									console.log('hero2:', hero2);
									hero1.allowAttack = true;
									hero2.allowAttack = true;
									waitArray.push({
										x : hero2.p.x,
										y : hero2.p.y,
										h : y - sy + 1,
										heroes : [ hero1.png, hero2.png ]
									});
								}
								sy--;
							}
							if (!hero1.allowAttack) {
								hero1.allowAttack = true;
								waitArray.push({
									x : hero1.p.x,
									y : hero1.p.y,
									h : 1,
									heroes : [ hero1.png ]
								});
							}
						}
					}
				}
			}
			console.log('waitArray:', waitArray);
			startProcess = true;
		}
	});

	Crafty.bind("EnterFrame", onEnterFrame);

	Crafty.e("Delay").delay(process, 200, -1);
	// Crafty.e("Delay").delay(process, 200, -1);
}

// var waitArray = [ {
// x : 2,
// y : 2,
// h : 2
// }, {
// x : 4,
// y : 4,
// h : 3
// } ];
var waitArray = [];
var waitIndex = 0;
var startProcess = false;
var process = function() {
	if (startProcess) {
		if (isMouseMove && !isMouseDown) {
			if (waitIndex < waitArray.length) {
				var hero = waitArray[waitIndex++];
				Crafty.e("locking").exe({
					x : hero.x,
					y : hero.y,
					h : hero.h,
					color : 'red'
				});

				// 播放英雄動畫
				if (hero.heroes.length > 1) {
					gv.heroAnimationPlaying = true;

					// overflow
					Crafty.e('2D, Canvas, Color').attr({
						x : 0,
						y : 0,
						w : 6 * gv.size,
						h : 9 * gv.size,
						z : 9999
					}).color('rgba(0, 0, 0, 0.5)');

					console.log('hero.heroes:', hero.heroes);
					Crafty.e("Delay").delay(function() {
						Crafty.e("heroAnimation").play({
							type : 'up',
							png : hero.heroes[1]
						});
					}, 100, 0);
					Crafty.e("Delay").delay(function() {
						Crafty.e("heroAnimation").play({
							type : 'down',
							png : hero.heroes[0]
						});
					}, 200, 0);

					Crafty.audio.play("Down2", 1);

					// hero.timeout(function() {
					// Crafty.e("heroAnimation").play({
					// type : 'left',
					// png : hero.heroes[1].png
					// });
					// }, 100);
					// hero.timeout(function() {
					// Crafty.e("heroAnimation").play({
					// type : 'right',
					// png : hero.heroes[1].png
					// });
					// }, 200);
				}
			}
		}

		if (waitIndex >= waitArray.length) {
			isMouseMove = false;
			waitIndex = 0; // clear
			waitArray = []; // clear
			startProcess = false;
		}
	}
}

mousemoved = function(e) {
	mouseX = e.clientX / gv.PTM_RATIO;
	mouseY = e.clientY / gv.PTM_RATIO;
};

getBodyAtMouse = function() {
	mousePVec = new b2Vec2(mouseX, mouseY);
	var aabb = new Box2D.Collision.b2AABB();
	aabb.lowerBound.Set(mouseX - 0.001, mouseY - 0.001);
	aabb.upperBound.Set(mouseX + 0.001, mouseY + 0.001);
	// aabb.lowerBound.Set(mouseX, mouseY);
	// aabb.upperBound.Set(mouseX, mouseY);
	// Query the world for overlapping shapes.
	// selectedBody = null;
	if (selectedBody == null) {
		world.QueryAABB(getBodyCB, aabb);
	}
	return selectedBody;
};

getBodyCB = function(fixture) {
	var fbody = fixture.GetBody();
	if (fbody.GetUserData().has("hero")) {
		if (fbody.GetType() !== b2Body.b2_staticBody) {
			if (fixture.GetShape().TestPoint(fbody.GetTransform(), mousePVec)) {
				selectedFixture = fixture;
				// console.log('selectedFixture:', selectedFixture);
				selectedFixture.SetSensor(false);
				selectedBody = fbody;

				// 設定最上層顯示
				// finalMovePoint = getFixPosition(selectedBody);
				var userData = selectedBody.GetUserData();
				// console.log('userData.p:', userData.p);
				finalMovePoint = Crafty.clone(userData.p);
				// userData.addComponent('aaa');
				userData.attr({
					z : ++zIndex
				});
				// console.log('userData:', userData);
				if (userData._children) {
					for ( var i in userData._children) {
						var o = userData._children[i];
						if (o.has("icon") || o.has("SpriteAnimation")) {
							o.z = ++zIndex;
						}
						if (o.has("blood")) {
							o.setZindex(++zIndex);
						}
					}
				}

				// console.log('userData:', selectedBody.GetUserData());
				selectedBody.SetType(b2Body.b2_dynamicBody);
				// console.log('selectedBody.type:', selectedBody.GetType());
				return false;
			}
		}
	}
	return true;
};

var onEnterFrame = function() {
	if (isMouseDown && (!mouseJoint)) {
		var body = getBodyAtMouse();
		if (body) {
			// 創建關節需求
			var md = new b2MouseJointDef();
			// 實例化關節
			md.bodyA = world.GetGroundBody();
			md.bodyB = body;
			md.target.Set(mouseX, mouseY);
			// 設置關節的一些特殊屬性
			md.collideConnected = true;
			// console.log(body.GetMass());
			md.maxForce = 1000 * body.GetMass();
			// 創建關節
			mouseJoint = world.CreateJoint(md);
			body.SetAwake(true);
			// console.log('body.GetPosition():', body.GetPosition());
			// console.log('body.GetAngle():', body.GetAngle());
		}
	}

	if (mouseJoint) {
		if (isMouseDown) {
			mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
		} else {
			world.DestroyJoint(mouseJoint);
			mouseJoint = null;
		}
	}
};

var ax = 0, ay = 4;
var doSomething = function() {
	if (isMouseMove && !isMouseDown) {
		var object = objects[ax][ay];
		// Crafty.timer.FPS(20);
		// console.log('object:', object);
		switch (object.actionType) {
		case 'knife':
			// test
			var hexagramIndex = Crafty.math.randomInt(0, 4);
			var attack = Crafty.e(HexagramName2[hexagramIndex]);
			attack.attr({
				x : size * 1.5,
				y : 0,
				z : 100
			});

			// 傷害
			var number = Crafty.math.randomInt(1000, 9999);
			var dx = size * 2.5;
			var dy = size;
			var dz = 101;
			Crafty.e("hurt").display(number, '#ff0000', dx, dy, dz);
			Crafty.audio.play("Explosion");
			break;
		case 'electric':
			// var h = hero[ax];
			// var attack = Crafty.e('exeHeal2');
			// attack.attr({
			// x : h.x - size / 2,
			// y : h.y - size / 2,
			// z : 100,
			// w : size * 2,
			// h : size * 2
			// });
			var h = hero[ax];
			var attack = Crafty.e('exeHeal62');
			attack.attr({
				x : h.x - size / 2,
				y : h.y - size / 2,
				z : 101,
				w : size * 2,
				h : size * 2
			});
			Crafty.audio.play("Heal3");
			break;
		case 'shield':
			var h = hero[ax];
			var attack = Crafty.e('exeState6');
			attack.attr({
				x : h.x - size / 2,
				y : h.y - 10,
				z : 100,
				w : size * 2,
				h : size * 2
			});
			Crafty.audio.play("Flash2");
			break;
		case 'test':
			// test
			var frameIndex = Crafty.math.randomInt(1, 5);
			// var frame = Crafty.e("attackFlame").play("flame" + frameIndex);
			var frame = Crafty.e("attackFlame").play("flame3");

			var ex = 3;
			var ey = 1;
			var sx = object.p.x - ex;
			var sy = object.p.y - ey;

			frame.addComponent("Box2D");
			frame.attr({
				x : object.p.x * size,
				y : object.p.y * size,
				z : 99,
				v : {
					x : -sx * 2,
					y : -sy * 2
				}
			}).box2d({
				isSensor : true, // 傳感器(default:true, 碰撞時反饋
				density : 0, // 1.0 質量[旋轉](設置密度密度為0，即表示該剛體是靜止不動的)
				friction : 0, // 2 表面摩擦力
				restitution : 0, // 0.2 表面張力[彈力](這個值越大，剛體越硬) 彈力,
				bodyType : 'dynamic', // dynamic
				shape : 'circle'
			});
			frame.body.SetLinearVelocity(new b2Vec2(0, -1));
			break;
		}

		if (object.actionType != 'test')
			object.toDead();

		if (++ay >= 7) {
			ay = 4;
			ax++;
		}
		if (ax >= 6) {
			isMouseMove = false;
			ax = 0;
			ay = 4;
			// 建置控制區
			Crafty.e("Delay").delay(genterateControl, 1000, 0);
		}

		// console.log('1');
	}
};

// 設定修正後之位置
function setFixPosition(body) {
	if (body) {
		var data = body.GetUserData();
		var p = getFixPosition(body);
		setPosition(body, p);
	}
}

// 取得修正後之位置
function getFixPosition(body) {
	if (body) {
		var data = body.GetUserData();
		// console.log('userData:', data);
		// 取絕對值再取中心點,再取臨界值
		var x = Math.floor((Math.abs(data.x) + (size / 2)) / size);
		var y = Math.floor((Math.abs(data.y) + (size / 2)) / size);
		return {
			x : x,
			y : y
		}
	}
	return null;
}

// 設定位置
function setPosition(body, p) {
	if (body && p) {
		body.SetPosition({
			x : p.x * size / gv.PTM_RATIO,
			y : p.y * size / gv.PTM_RATIO
		});
	}
}

var vec4 = [ new b2Vec2(30, 0), new b2Vec2(-30, 0), new b2Vec2(0, 30),
		new b2Vec2(0, -30) ];
var vec41 = [ new b2Vec2(20, -20), new b2Vec2(-20, -20), new b2Vec2(20, 20),
		new b2Vec2(-20, 20) ];
var vec8 = [ new b2Vec2(20, 0), new b2Vec2(-20, 0), new b2Vec2(0, 20),
		new b2Vec2(0, -20), new b2Vec2(20, -20), new b2Vec2(-20, -20),
		new b2Vec2(20, 20), new b2Vec2(-20, 20) ];

var HexagramName = [ 'ice', 'wind', 'fire', 'light', 'dark' ];
var HexagramName2 = [ 'exeAttack3', 'exeAttack5', 'exeAttack2', 'exeAttack4',
		'exeDarkness1' ];
var attackCreate = function(p) {
	var hexagramIndex = Crafty.math.randomInt(0, 4);

	for (var i = 0; i <= 3; i++) {
		// var attack = Crafty.e('attackHexagram').play('dark');
		var attack = Crafty.e('attackHexagram').play(
				HexagramName[hexagramIndex]);
		attack.addComponent("Box2D");
		attack.addComponent("Collision");
		attack.attr({
			attackIndex : hexagramIndex,
			p : Crafty.clone(p),
			x : p.x * size + 8,
			y : p.y * size + 8,
			// h : size,
			// w : size,
			r : 0.51
		}).box2d({
			isSensor : true, // 傳感器(default:true, 碰撞時反饋
			density : 0, // 1.0 質量[旋轉](設置密度密度為0，即表示該剛體是靜止不動的)
			friction : 0, // 2 表面摩擦力
			restitution : 0, // 0.2 表面張力[彈力](這個值越大，剛體越硬) 彈力,
			bodyType : 'dynamic', // dynamic
			shape : 'circle'
		});
		// .onContact("enemy", ContactEnemy);

		// console.log('boxAttack:', boxAttack);
		// var attackBody = boxAttack.GetBody();
		// var attackBody = attack.body;
		// attack.body.SetLinearVelocity(new b2Vec2(50, 0));
		// console.log(attack.body);
		attack.body.SetLinearVelocity(vec4[i]);
		// attack.body.SetLinearVelocity(vec8[i]);
		// attack.body.ApplyForce(vec4[i]);
		// attack.body.SetLinearVelocity(vec41[i]);

		attack.checkHits('enemy').bind(
				"HitOn",
				function(hitData) {
					// console.log('HitOn >>>>:', hitData);
					var block = hitData[0].obj
					// var userData = this.body.GetUserData();
					var userData = block.body.GetUserData();
					// var attack = Crafty.e("exeDarkness1");
					// console.log(HexagramName2[this.attackIndex]);
					var attack = Crafty.e(HexagramName2[this.attackIndex]);
					attack.attr({
						x : userData.x + size / 2 - attack.w / 2,
						y : userData.y + size / 2 - attack.h / 2,
						z : userData.z + 100
					});

					// 傷害
					var number = Crafty.math.randomInt(1000, 9999);
					var dx = userData.x + 12;
					var dy = userData.y + 12;
					var dz = userData.z + 101;
					block.hurt = Crafty.e("hurt").display(number, '#ff0000',
							dx, dy, dz);

					// status
					// if (!block.has("status1")) {
					// var ss = "2D, Canvas, SpriteAnimation, status1"
					// var status = Crafty.e(ss);
					// status.attr({
					// x : userData.x + 30,
					// y : userData.y - 32,
					// z : userData.z + 1
					// });
					// status.reel("statusAction", 1000, [ [ 1, i ], [ 2, i ],
					// [ 3, i ], [ 4, i ], [ 5, i ], [ 6, i ],
					// [ 7, i ] ]);
					// status.animate("statusAction", -1);
					// block.attach(status);
					// }

					// this.resetHitChecks('piece');
				})
	}

	// attackBody.ApplyImpulse(new b2Vec2(10 / gv.PTM_RATIO, 0), boxAttack.body
	// .GetWorldCenter());
}

var ContactEnemy = function(data) {
	// console.log('Enemy>>>>:');
	var block = data[0].obj;

	var bName = block.body.GetUserData()._entityName;
	// console.log('Enemy >>>>:', bName);
	// var n = Crafty.math.randomInt(1, 5);
	// var attack = Crafty.e("exeAttack" + n);
	// var attack = Crafty.e("exeMeteor");
	// var userData = block.body.GetUserData();
	var userData = this.body.GetUserData();
	var attack = Crafty.e("exeDarkness1");
	attack.attr({
		x : userData.x + size / 2 - attack.w / 2,
		y : userData.y + size / 2 - attack.h / 2,
		z : userData.z + 1
	});
	// Crafty.audio.play("Explosion");
};