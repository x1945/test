/* Author: @shogoki_vnz
 */
var size = 50;
var zIndex = 8;
var world, PTM_RATIO = 32, w = size * 6, h = size * 8, hw = w / 2, hh = h / 2, mouseJoint, ctx = this, isMouseDown = false, mouseX, mouseY, mousePVec, selectedBody;
var moveRoles = [];

window.onload = function() {
	gameInit();
};

gameInit = function() {
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
	Crafty.sprite(100, "img/monster.png", {
		monster : [ 0, 0 ]
	});
	Crafty.scene("loading", function() {
		Crafty.load({
			images : [ "img/822.png", "img/912.png", "img/945.png",
					"img/1025.png", "img/1026.png", "img/1046.png",
					"img/1047.png", "img/1048.png", "img/monster.png" ]
		}, function() {
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

	genterateChars();
}

genterateChars = function() {

	for (var i = 0; i < 8; ++i) {
		var _w, _h, shape;

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
		var role = "2D, Canvas, Mouse, Box2D, since, " + "role" + (i + 1);
		// var role = "2D, Canvas, Mouse, Box2D, since";
		// var role = "2D, Canvas, Mouse, Box2D, since";
		// console.log("role:" + role);
		// "2D, Canvas, ball, Mouse, Box2D"

		var r = Crafty.e(role).origin("center");
		var fallingElement = r.attr({
			// var fallingElement = Crafty.e("2D, Canvas, Color, ball, Mouse,
			// Box2D")
			// .origin("center").color("#ffffff").attr({
			// x : Crafty.math.randomInt(30, w - 100),
			// y : Crafty.math.randomInt(30, h - 100), // 0
			x : (i % 6) * size,
			y : i * size, // 0
			h : size,
			w : size,
			r : 0.75
		}).box2d({
			// bodyType : i % 2 == 0 ? 'static' : 'dynamic', // dynamic
			// bodyType : 'dynamic', // dynamic
			// bodyType : 'static', // static
			density : 0, // 1.0 質量[旋轉](設置密度密度為0，即表示該剛體是靜止不動的)
			friction : 0, // 2 表面摩擦力
			restitution : 0, // 0.2 表面張力[彈力](這個值越大，剛體越硬) 彈力
			shape : shape
		}).onContact("since", function(data) {
			if (selectedBody != null) {
				var sName = selectedBody.GetUserData()._entityName;
				var block = data[0].obj;
				var bName = block.body.GetUserData()._entityName;
				if (sName != bName) {
					console.log('sName:', sName, 'bName:', bName);
					// if (!block.onHit) {
					// block.onHit = true;
					// block.mp = getFixPosition(selectedBody);
					// block.mp.x *= size;
					// block.mp.y *= size;
					// moveRoles.push(block);
					// }
				}
			}
		});

		if (i == 0) {
			// var sq1 = Crafty.e("Square").color("rgba(255, 0, 0)");
			// sq1.bind('EnterFrame', function() {
			// this.x = r.x - 1;
			// this.y = r.y - 1;
			// this.z = r.z - 1;
			// });
			//
			// var sq2 = Crafty.e("Square").color("rgba(255, 0, 0, 0.5)");
			// sq2.bind('EnterFrame', function() {
			// this.x = sq1.x - 5;
			// this.y = sq1.y - 5;
			// this.z = sq1.z - 1;
			// });
			//
			// var sq3 = Crafty.e("Square").color("rgba(255, 0, 0, 0.1)");
			// sq3.origin("center");
			// sq3.bind('EnterFrame', function() {
			// this.x = sq2.x - 5;
			// this.y = sq2.y - 5;
			// this.z = sq2.z - 1;
			// });
		}
		fallingElement.attach(Crafty.e('Square').attr({
			x : (i % 6) * size,
			y : i * size, // 0
		}));
		fallingElement.attach(Crafty.e('Square1').attr({
			x : (i % 6) * size,
			y : i * size, // 0
		}));
		fallingElement.attach(Crafty.e('Square2').attr({
			x : (i % 6) * size,
			y : i * size, // 0
		}));
		fallingElement.attach(Crafty.e('icon').set('monster').attr({
			x : (i % 6) * size,
			y : i * size,
			w : 20,
			h : 20
		}));
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
			// console.log('selectedBody:', selectedBody);
			selectedBody.SetType(b2Body.b2_kinematicBody);
			selectedBody.SetLinearVelocity(new b2Vec2(0, 0));
			setFixPosition(selectedBody);
			selectedBody = null;
		}
	});

	Crafty.bind("EnterFrame", onEnterFrame);

	// Crafty.e('VStackerContainer').attr({
	// h : 200,
	// w : 400,
	// x : 10,
	// y : 10
	// }).appendItem(Crafty.e('MenuHeading').text('Heading 1')).appendItem(
	// Crafty.e('Button, Text').text('Button 1')).appendItem(
	// Crafty.e('HStackerContainer').attr({
	// h : 100
	// }).margin(20).padding(40).css({
	// border : "solid thin black"
	// }).appendItem(Crafty.e('MenuHeading').text('Heading 2'))
	// .appendItem(Crafty.e('Button, Text').text('Button 2')))
	// .render(true);
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
		// moveRoles = [];
	}
	return selectedBody;
}

getBodyCB = function(fixture) {
	if (fixture.GetBody().GetType() !== b2Body.b2_staticBody) {
		if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(),
				mousePVec)) {
			// console.log('fixture:', fixture);
			selectedBody = fixture.GetBody();
			//
			// console.log('selectedBody:', selectedBody);
			var userData = selectedBody.GetUserData()
			userData.attr({
				z : ++zIndex
			});
			if (userData._children) {
				for ( var i in userData._children) {
					var o = userData._children[i];
					if (o.has("icon")) {
						o.z = ++zIndex;
					}
				}
			}

			console.log('userData:', selectedBody.GetUserData());
			selectedBody.SetType(b2Body.b2_dynamicBody);
			// console.log('selectedBody.type:', selectedBody.GetType());
			return false;
		}
	}
	return true;
}

onEnterFrame = function() {
	if (isMouseDown && (!mouseJoint)) {
		var body = getBodyAtMouse();
		if (body) {
			var p = body.m_xf.position;
			// 創建關節需求
			var md = new b2MouseJointDef();
			// 實例化關節
			md.bodyA = world.GetGroundBody();
			md.bodyB = body;
			md.target.Set(mouseX, mouseY);
			// md.target.Set(p.x, p.y);
			// 設置關節的一些特殊屬性
			md.collideConnected = true;
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
	var mrLen = moveRoles.length;
	if (mrLen > 0) {
		for (var i = 0; i < mrLen; i++) {
			var block = moveRoles[i];
			if (movePosition(block.body, block.mp)) {
				// block.onHit = false;
			}
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

// 移動位置
var mm = 0;
function movePosition(body, p) {
	// console.log('movePosition:', p);
	if (mm > 10)
		return;
	mm++;
	if (body && p) {
		var data = body.GetUserData();
		var mx = 0, my = 0;
		if (data.x > p.x)
			mx = -1;
		if (data.x < p.x)
			mx = 1;
		if (data.y > p.y)
			my = -1;
		if (data.y < p.y)
			my = 1;
		console.log('movePosition:', data.x, data.y, p.x, p.y);
		// setPosition(body, {
		// x : mx,
		// y : my
		// });

		body.ApplyImpulse(new b2Vec2(mx / PTM_RATIO, my / PTM_RATIO), body
				.GetWorldCenter());
		return true;
	}
	return true;
}