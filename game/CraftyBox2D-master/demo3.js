var size = 50;
var zIndex = 8;
var world, PTM_RATIO = 32, w = size * 6, h = size * 8, hw = w / 2, hh = h / 2, mouseJoint, ctx = this, isMouseDown = false, mouseX, mouseY, mousePVec, selectedBody, selectedFixture;
var objects = [];
window.onload = function() {
	gameInit();
};

gameInit = function() {
	// 建立二維物件陣列
	objects = [];
	for (var x = 0; x < 6; x++) {
		objects[x] = [];
		for (var y = 0; y < 8; y++) {
			objects[x][y] = null;
		}
	}
	// start crafty
	// Crafty.init(w, h);
	Crafty.init(w, h, document.getElementById('game'));
	// Crafty.canvas.init(); //Crafty.js 0.6.x
	Crafty.canvasLayer.init(); // Crafty.js 0.7.x
	// Init the box2d world, gx = 0, gy = 10
	// Crafty.box2D.init(0, 10, PTM_RATIO, true);
	// 設定無重力
	Crafty.box2D.init(0, 0, PTM_RATIO, true);
	world = Crafty.box2D.world;
	// Start the Box2D debugger
	// Crafty.box2D.showDebugInfo();
	// load png
	Crafty.sprite(100, "img/822.png", {
		role1 : [ 0, 0 ]
	});
	Crafty.sprite(100, "img/912.png", {
		role2 : [ 0, 0 ]
	});
	Crafty.sprite(100, "img/945.png", {
		role3 : [ 0, 0 ]
	});
	Crafty.sprite(100, "img/1025.png", {
		role4 : [ 0, 0 ]
	});
	Crafty.sprite(100, "img/1026.png", {
		role5 : [ 0, 0 ]
	});
	Crafty.sprite(100, "img/1046.png", {
		role6 : [ 0, 0 ]
	});
	Crafty.sprite(100, "img/1047.png", {
		role7 : [ 0, 0 ]
	});
	Crafty.sprite(100, "img/1048.png", {
		role8 : [ 0, 0 ]
	});

	// characteristic
	Crafty.sprite(24, "img/IconSet.png", {
		characteristic0 : [ 8, 6 ],
		characteristic1 : [ 9, 6 ],
		characteristic2 : [ 10, 6 ],
		characteristic3 : [ 11, 6 ],
		characteristic4 : [ 12, 6 ],
		characteristic5 : [ 13, 6 ],
		characteristic6 : [ 14, 6 ],
		characteristic7 : [ 15, 6 ],
		characteristic8 : [ 16, 6 ]
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
	// attack5
	Crafty.sprite(192, "Animations/Meteor.png", {
		Meteor : [ 0, 0 ]
	});

	Crafty.scene("loading", function() {
		Crafty.load({
			images : [ "img/822.png", "img/912.png", "img/945.png",
					"img/1025.png", "img/1026.png", "img/1046.png",
					"img/1047.png", "img/1048.png", "img/IconSet.png",
					"Animations/Attack1.png", "Animations/Attack2.png",
					"Animations/Attack3.png", "Animations/Attack4.png",
					"Animations/Attack5.png", "Animations/Darkness1.png",
					"Animations/Meteor.png", "Animations/Balloon.png" ],
			audio : {
				"theme" : [ "audio/theme2.mp3" ],
				"Explosion" : [ "audio/Explosion1.ogg" ],
				"switch" : [ "audio/koma_irekae.mp3" ]
			}
		}, function() {
			// Crafty.audio.play("theme", -1);
			console.log('load finish');
			Crafty.scene("main");
		});
		// Crafty.background("#000000");
		Crafty.e("2D, DOM, Text").attr({
			w : 100,
			h : 20,
			x : hw - 50,
			y : hh - 10
		}).text("Loading").css({
			"text-align" : "center",
			"color" : "#000000"
		});
	});
	Crafty.scene("loading");

	Crafty.scene("main", function() {
		generateWorld();
	});
	// Crafty.scene("main");
}

generateWorld = function() {
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
	});
	walls.addFixture({
		bodyType : 'static',
		density : 1.0,
		friction : 10,
		restitution : 0,
		shape : [ [ w, 0 ], [ w, h ] ]
	});
	walls.addFixture({
		bodyType : 'static',
		density : 1.0,
		friction : 10,
		restitution : 0,
		shape : [ [ 0, h ], [ w, h ] ]
	});

	// 建置角色
	genterateChars();
	// 建置感應區
	createSense();
}

var moveArea = [];
var finalMovePoint = {};

// 建置感應區
var createSense = function() {
	for (var x = 0; x < 6; x++) {
		for (var y = 0; y < 8; y++) {
			if (objects[x][y] == null) {
				var role = "2D, Canvas, Color, Box2D, Sense";
				var r = Crafty.e(role).origin("center");
				r.attr({
					p : {
						x : x,
						y : y
					},
					x : x * size,
					y : y * size, // 0
					h : size,
					w : size,
					r : 0.51
				}).box2d({
					isSensor : true, // 傳感器(default:true, 碰撞時反饋
					density : 0, // 1.0 質量[旋轉](設置密度密度為0，即表示該剛體是靜止不動的)
					friction : 0, // 2 表面摩擦力
					restitution : 0, // 0.2 表面張力[彈力](這個值越大，剛體越硬) 彈力
					// shape : 'box'
					shape : "circle"
				}).onContact("Sense", ContactSense);
				objects[x][y] = r;
			}
		}
	}
}

//
var ContactSense = function(data) {
	if (selectedBody != null) {
		var sName = selectedBody.GetUserData()._entityName;
		var block = data[0].obj;
		var bName = block.body.GetUserData()._entityName;
		if (sName != bName) {
			var p = Crafty.clone(finalMovePoint);
			finalMovePoint = Crafty.clone(block.p);
			block.p = p;
			setPosition(block.body, p);
			var data = block.body.GetUserData();
			// 和角色交換才播音效
			if (block.body.GetUserData().has("since")) {
				Crafty.audio.play("switch");
			} else {
				var n = Crafty.math.randomInt(1, 5);
				// var attack = Crafty.e("exeAttack" + n);
				// var attack = Crafty.e("exeMeteor");
				var attack = Crafty.e("exeDarkness1");

				attack.attr({
					x : data.x + size / 2 - attack.w / 2,
					y : data.y + size / 2 - attack.h / 2,
					z : selectedBody.GetUserData().z - 1
				});
				// Crafty.audio.play("Explosion");
			}
		}
	}
}

genterateChars = function() {
	for (var i = 0; i < 8; i++) {
		var _w, _h, shape;
		var hasD = (i % 2 == 0);
		if (Math.random() > 0.5) {
			_w = Crafty.math.randomInt(PTM_RATIO, PTM_RATIO * 2);
			_h = Crafty.math.randomInt(PTM_RATIO, PTM_RATIO * 2);
			shape = "box";
		} else {
			_w = Crafty.math.randomInt(PTM_RATIO, PTM_RATIO * 2);
			_h = _w;
			shape = "circle";
		}
		// shape = "box";
		shape = "circle";
		var role = "2D, Canvas, Mouse, Box2D, since, Sense, " + "role"
				+ (i + 1);
		if (hasD) {
			role = "2D, Canvas, Mouse, Box2D, role" + (i + 1);
			shape = "box";
		}
		// var role = "2D, Canvas, Mouse, Box2D, since";
		// var role = "2D, Canvas, Mouse, Box2D, since";
		// console.log("role:" + role);
		// "2D, Canvas, ball, Mouse, Box2D

		var r = Crafty.e(role).origin("center");
		var fallingElement = r.attr({
			// var fallingElement = Crafty.e("2D, Canvas, Color, ball,
			// Mouse,
			// Box2D")
			// .origin("center").color("#ffffff").attr({
			// x : Crafty.math.randomInt(30, w - 100),
			// y : Crafty.math.randomInt(30, h - 100), // 0
			p : {
				x : i % 6,
				y : i
			},
			x : (i % 6) * size,
			y : i * size, // 0
			h : size,
			w : size,
			r : 0.51
		}).box2d({
			isSensor : (hasD ? false : true), // 傳感器(default:true, 碰撞時反饋
			// categoryBits : (i % 2 == 0 ? 2 : 4),
			// maskBits : (i % 2 == 0 ? 3 : 5),
			// groupIndex : i % 3,
			// bodyType : i % 2 == 0 ? 'static' : 'dynamic', // dynamic
			// bodyType : 'dynamic', // dynamic
			// bodyType : 'static', // static
			density : 0, // 1.0 質量[旋轉](設置密度密度為0，即表示該剛體是靜止不動的)
			friction : 0, // 2 表面摩擦力
			restitution : 0, // 0.2 表面張力[彈力](這個值越大，剛體越硬) 彈力
			shape : shape
		}).onContact("Sense", ContactSense);
		// .onContact("since", ContactSince);

		fallingElement.attach(Crafty.e('Square').attr({
			x : (i % 6) * size - 2,
			y : i * size - 2, // 0
		}).color(hasD ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 0, 255, 0.3)'));

		// characteristic
		fallingElement.attach(Crafty.e('icon').set('characteristic' + i).attr({
			x : (i % 6) * size,
			y : i * size,
			w : 20,
			h : 20
		}));

		// status
		var status = Crafty.e("2D, Canvas, SpriteAnimation, status" + i);
		status.attr({
			x : (i % 6) * size + 20,
			y : i * size - 32,
		});
		status.reel("statusAction", 1000, [ [ 1, i ], [ 2, i ], [ 3, i ],
				[ 4, i ], [ 5, i ], [ 6, i ], [ 7, i ] ]);
		status.animate("statusAction", -1);
		fallingElement.attach(status);

		// 放入二維陣列
		objects[(i % 6)][i] = fallingElement;
	}

	Crafty.addEvent(ctx, "mousedown", function(e) {
		isMouseDown = true;
		mousemoved(e);
		Crafty.addEvent(ctx, "mousemove", mousemoved)
	});

	Crafty.addEvent(ctx, "mouseup", function() {
		Crafty.removeEvent(ctx, "mousemove", mousemoved);
		isMouseDown = false;
		mouseX = undefined;
		mouseY = undefined;

		if (selectedBody != null) {
			var userData = selectedBody.GetUserData()
			userData.p = Crafty.clone(finalMovePoint);

			selectedBody.SetType(b2Body.b2_kinematicBody);
			selectedBody.SetLinearVelocity(new b2Vec2(0, 0));
			// setFixPosition(selectedBody);
			setPosition(selectedBody, finalMovePoint);
			selectedBody = null;

			selectedFixture.SetSensor(true);
			selectedFixture = null;
		}
	});

	Crafty.bind("EnterFrame", onEnterFrame);
}

//
var ContactSince = function(data) {
	if (selectedBody != null) {
		var sName = selectedBody.GetUserData()._entityName;
		var block = data[0].obj;
		var bName = block.body.GetUserData()._entityName;
		if (block.hurt) {
			if (block.hurt.isDestory)
				block.hurt = null;
		}
		// if (sName != bName && block.hurt == null) {
		if (sName != bName) {
			// var bp = getFixPosition(block.body);
			// console.log('block:', block);
			// console.log('block.body:', block.body);
			var bp = Crafty.clone(block.p);
			// var p = moveArea.shift();
			console.log('bp:', bp);
			var p = Crafty.clone(finalMovePoint);
			console.log();
			finalMovePoint = Crafty.clone(bp);
			block.p = p;
			console.log('change point:', bp, finalMovePoint);
			setPosition(block.body, p);
			// if (p && bp) {
			// while (p.x == bp.x && p.y == bp.y && moveArea.length > 0) {
			// p = moveArea.shift();
			// moveArea.unshift(bp);
			// }
			// while (moveArea.length > 3) {
			// moveArea.pop();
			// }
			// finalMovePoint = Crafty.clone(bp);
			// }
			// console.log('moveArea:', moveArea);
			// console.log('move p:', p);
			Crafty.audio.play("switch");

			// Crafty.audio.play("Explosion");
			// var data = block.body.GetUserData();
			// var number = Crafty.math.randomInt(1000, 9999);
			// var dx = data.x + 12;
			// var dy = data.y + 12;
			// var dz = selectedBody.GetUserData().z + 1;
			// block.hurt = Crafty.e("hurt")
			// .display(number, '#ff0000', dx, dy, dz);
			//
			// var attack = Crafty.e("2D, Canvas, SpriteAnimation, Attack1");
			// attack.attr({
			// x : data.x + size / 2 - attack.w / 2,
			// y : data.y + size / 2 - attack.h / 2,
			// z : dz + 1
			// });
			// attack.origin("center");
			// attack.reel("attack1Action", 100, [ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ]
			// ]);
			// attack.animate("attack1Action", 1);
			// attack.bind('EnterFrame', function() {
			// if (!this.isPlaying('attack1Action')) {
			// this.destroy();
			// }
			// });
		}
	}
}

mousemoved = function(e) {
	mouseX = e.clientX / PTM_RATIO;
	mouseY = e.clientY / PTM_RATIO;
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
}

getBodyCB = function(fixture) {
	var fbody = fixture.GetBody();
	if (fbody.GetUserData().has("since")) {
		if (fbody.GetType() !== b2Body.b2_staticBody) {
			if (fixture.GetShape().TestPoint(fbody.GetTransform(), mousePVec)) {
				selectedFixture = fixture;
				// console.log('selectedFixture:', selectedFixture);
				selectedFixture.SetSensor(false);
				selectedBody = fbody;

				// 設定最上層顯示
				moveArea = []; // 清除移動區
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
						if (o.has("icon")) {
							o.z = ++zIndex;
						}
						if (o.has("SpriteAnimation")) {
							o.z = ++zIndex;
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
}

var pp = {};

onEnterFrame = function() {
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
}

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
			x : p.x * size / PTM_RATIO,
			y : p.y * size / PTM_RATIO
		});
	}
}