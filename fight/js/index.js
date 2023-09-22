import { Sprite, render } from "./sprite.js";
import { Transform } from "./transform.js";
import { Player } from "./player.js";
import { PBody } from "./pbody.js";
import { vAdd } from "./vec.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;

const bkg = new Sprite('#9bf', new Transform(500, 250, 1000, 500));
bkg.setContext(context);
bkg.zIndex = -1;

const player1 = new Player('#f00', new PBody(100, 200, 70, 150));
player1.setContext(context);

const player2 = new Player('#00f', new PBody(900, 200, 70, 150));
player2.attackBox.offset.x = -player2.attackBox.offset.x
player2.setContext(context);

let keysDown = [];

function handleInput() {
	let p1MoveDir = {x: 0, y: 0};
	if (keysDown.includes("a")) {
		p1MoveDir.x -= 1;
	}
	if (keysDown.includes("d")) {
		p1MoveDir.x += 1;
	}
	if (keysDown.includes("w")) {
		p1MoveDir.y = 1;
	}
	player1.input.attack = keysDown.includes("f");
	player1.input.moveDirection = p1MoveDir;

	let p2MoveDir = {x: 0, y: 0};
	if (keysDown.includes("ArrowLeft")) {
		p2MoveDir.x -= 1;
	}
	if (keysDown.includes("ArrowRight")) {
		p2MoveDir.x += 1;
	}
	if (keysDown.includes("ArrowUp")) {
		p2MoveDir.y = 1;
	}
	player2.input.attack = keysDown.includes("0");
	player2.input.moveDirection = p2MoveDir;
}

let previousTick = 0;
function stepped(timeStamp) {
	if (timeStamp === undefined) {
		timeStamp = 0;
	}

	const elapsed = timeStamp * 0.001;
	const delta = elapsed - previousTick;

	if (previousTick !== elapsed) {
		handleInput();
		
		player1.update(delta);
		player2.update(delta);
		
		render();
	}

	previousTick = elapsed;
	requestAnimationFrame(stepped);
}
stepped();

window.addEventListener('keydown', function(event) {
	if (!keysDown.includes(event.key)) {
		keysDown.push(event.key);
	}
})
window.addEventListener('keyup', function(event) {
	const idx = keysDown.indexOf(event.key);
	if (idx != -1) {
		keysDown.splice(idx, 1);
	}
})