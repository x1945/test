var w = document.body.clientWidth - 20;
var h = document.body.clientHeight - 20;
console.log('w:', w, 'h:', h);
Crafty.init(w, h, document.getElementById('game'));

var px = 0;
var py = 0;

var wall = null;
var since = null;

Crafty.c("piece", {
	init : function() {
		this.z = 3;
		this.requires("Mouse, Collision, Draggable");
		this.bind('StartDrag', function() {
			console.log("Start");
			wall = null;
			px = this.x;
			py = this.y;
		});
		this.bind('Dragging', function(from) {
			// if (this.hit('Floor')) {
			// this.attr({
			// x : from.x,
			// y : from.y
			// });
			// }

			// console.log('x:', this.x, 'y:', this.y);

			// if (since) {
			// this.attr({
			// x : since.x,
			// y : since.y
			// });
			// }

			// if (wall) {
			// var hit = false;
			// var goRight = goLeft = goUp = goDown = false;
			// if (this.x != px) {
			// if (this.x > px) {
			// console.log('向右');
			// goRight = true;
			// } else {
			// console.log('向左');
			// goLeft = true;
			// }
			// }
			// if (this.y != py) {
			// if (this.y > py) {
			// console.log('向下');
			// goDown = true;
			// } else {
			// console.log('向上');
			// goUp = true;
			// }
			// }
			//
			// // console.log('wall:', wall);
			// var sx = this.x, sy = this.y, ex = this.x + this.w, ey = this.y
			// + this.h;
			// if (goRight) {
			// if ((sy > wall.sy && sy < wall.ey)
			// || (ey > wall.sy && ey < wall.ey)) {
			// this.x = wall.x - this.w;
			// hit = true;
			// }
			// }
			// if (goLeft) {
			// if ((sy > wall.sy && sy < wall.ey)
			// || (ey > wall.sy && ey < wall.ey)) {
			// this.x = wall.ex;
			// hit = true;
			// }
			// }
			// if (goDown) {
			// if ((sx > wall.sx && sx < wall.ex)
			// || (ex > wall.sx && ex < wall.ex)) {
			// this.y = wall.y - this.h;
			// hit = true;
			// }
			// }
			// if (goUp) {
			// if ((sx > wall.sx && sx < wall.ex)
			// || (ex > wall.sx && ex < wall.ex)) {
			// this.y = wall.ey;
			// hit = true;
			// }
			// }
			// if (!hit)
			// wall = null;
			// }
			//
			// px = this.x;
			// py = this.y;

		});
		this.bind("StopDrag", function() {
			console.log("STOP");
			wall = null;
			// var column = Math.round(this._x / 64);
			// this.x = column * 64;
			// this.gravity("Floor");
			// this.unbind("mousedown");

			// reset(column);
		});
		this.bind('Moved', function(from) {
			console.log('x:', from.x, 'y:', from.y);
			console.log('x:', this.x, 'y:', this.y);
			if (this.hit('Floor')) {
				this.attr({
					x : from.x,
					y : from.y
				});
			}
		});

	}
});

Crafty.e('Floor, 2D, Canvas, Color, Collision').attr({
	x : 0,
	y : 250,
	w : 250,
	h : 10
}).color('green').checkHits('piece').bind("HitOn", function(hitData) {
	var obj = hitData[0].obj
	since = {
		x : obj.x,
		y : obj.y,
		w : obj.w,
		h : obj.h,
		sx : obj.x,
		sy : obj.y,
		ex : obj.x + obj.w,
		ey : obj.y + obj.h
	};
	// this.resetHitChecks('piece');
}).bind("HitOff", function(comp) {
	console.log("Collision with Solid entity ended.");
	// wall = null;
});

Crafty.e('piece, 2D, Canvas, Color, Collision, Tween').attr({
	x : 50,
	y : 50,
	w : 50,
	h : 50
}).color('#F00').tween({
	rotation : 180
}, 2000, "linear");

Crafty.e("2D, Canvas, Tween, Text").text("TEST").attr({
	x : 0,
	y : 0,
	w : 100,
	h : 100,
	size : 10,
	alpha : 0.0,
	rotation : 0
}).tween({
	x : 200,
	y : 180,
	w : 200,
	size : 20,
	h : 200,
	alpha : 1.0,
	rotation : 360
}, 2000, "smoothStep").timeout(function() {
	// this.destroy();
}, 2000);

Crafty.e("2D, Canvas, Tween, Text").text("TEST").attr({
	x : 0,
	y : 0,
	alpha : 0.0,
	rotation : 0
}).tween({
	x : 200,
	y : 200,
	alpha : 1.0,
	rotation : 360
}, 2000, "easeInQuad").timeout(function() {
	// this.destroy();
}, 2000);

// Crafty.e('piece, 2D, Canvas, Color, Collision').attr({
// x : 0,
// y : 0,
// w : 50,
// h : 50
// }).color('#F00').checkHits('Floor').bind("HitOn", function(hitData) {
// // console.log("Collision hitData", hitData);
// console.log("Collision hitData");
// // this.y = hitData[0].obj.y - this.h;//
// // this.resetHitChecks('Floor');
// var obj = hitData[0].obj
// wall = {
// x : obj.x,
// y : obj.y,
// w : obj.w,
// h : obj.h,
// sx : obj.x,
// sy : obj.y,
// ex : obj.x + obj.w,
// ey : obj.y + obj.h
// };
// }).bind("HitOff", function(comp) {
// console.log("Collision with Solid entity ended.");
// });
// .bind('Moved', function(from) {
// if (this.hit('Floor')) {
// this.attr({x: from.x, y:from.y});
// }
// });

var fps = 0;
setInterval(function() {
	if (fps != Crafty.timer.FPS()) {
		fps = Crafty.timer.FPS();
		console.log('FPS change:', fps);
		document.getElementById('fpsDisplay').innerHTML = fps;
	}
}, 1000);
