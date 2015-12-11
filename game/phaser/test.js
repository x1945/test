var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {
	preload : preload,
	create : create,
	update : update,
	render : render
});

function preload() {
	game.load.spritesheet('item', '../assets/buttons/number-buttons-90x90.png',
			90, 90);
}

var sprites;
var ox = null;

function create() {
	game.stage.backgroundColor = '#ffffff';
//	game.physics.startSystem(Phaser.Physics.ARCADE);
	// Here we create a group, populate it with sprites, give them all a random
	// velocity
	// and then check the group against itself for collision
	sprites = game.add.physicsGroup(Phaser.Physics.ARCADE);
	for (var i = 0; i < 6; i++) {
		var item = sprites.create(90, 90 * i, 'item', i);
		// item.name = 'item' + i;
		// Enable input detection, then it's possible be dragged.
		item.inputEnabled = true;
		// item.enableBody = true;
		// Make this item draggable.
		// item.input.enableDrag();
		item.input.enableDrag(false, true);

		// item.events.onDragStart.add(startDrag, this);
		// item.events.onDragStop.add(fixLocation, this);

		// Then we make it snap to left and right side,
		// also we make it only snap when released.
//		 item.input.enableSnap(90, 90, false, true);

		// item.play('spin', 20, true);
		// item.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd
		// .integerInRange(-200, 200));

//		item.events.onInputDown.add(onDown, this);
//		item.events.onInputUp.add(onUp, this);
	}

//	 sprites.setAll('body.collideWorldBounds', true);
//	 sprites.setAll('body.bounce.x', 1);
//	 sprites.setAll('body.bounce.y', 1);

	// Add some items to left side, and set a onDragStop listener
	// to limit its location when dropped.

	// for (var i = 0; i < 6; i++) {
	// // Directly create sprites on the left group.
	// var item = game.add.sprite(90, 90 * i, 'item', i);
	// item.name = 'item' + i;
	// // Enable input detection, then it's possible be dragged.
	// item.inputEnabled = true;
	// item.enableBody = true;
	// // Make this item draggable.
	// item.input.enableDrag();
	//
	// // Then we make it snap to left and right side,
	// // also we make it only snap when released.
	// // item.input.enableSnap(90, 90, false, true);
	//
	// // Limit drop location to only the 2 columns.
	// // item.events.onDragStop.add(fixLocation);
	// }
}

function render() {
	// game.debug.text('Group Left.', 100, 560);
	// game.debug.text('Group Right.', 280, 560);
	// game.debug.text(sprites, 100, 560);
	// game.debug.bodyInfo(sprites, 100, 560);
}

function fixLocation(item) {

	// Move the items when it is already dropped.
	if (item.x < 90) {
		item.x = 90;
	} else if (item.x > 180 && item.x < 270) {
		item.x = 180;
	} else if (item.x > 360) {
		item.x = 270;
	}
}

function update() {
//	if (game.input.mousePointer.isDown) {
//		console.log('x:', game.input.x, 'y:', game.input.y);
//		ox.x = game.input.x;
//		ox.y = game.input.y;
//	}
	// game.physics.arcade.collide(sprite1, sprite2, collisionHandler, null,
	// this);
	game.physics.arcade.collide(sprites);
	// console.log('update');
}

function collisionHandler(obj1, obj2) {

	game.stage.backgroundColor = '#992d2d';

}

function onDown(obj) {

	obj.alpha = 0.3;
	ox = obj;
}

function onUp(obj) {
	ox = null;
	obj.alpha = 1;

}

function mouseDragStart() {

	console.log('mouseDragStart');

}

function mouseDragMove() {

	console.log('mouseDragMove');

}

function mouseDragEnd() {

	console.log('mouseDragEnd');

}