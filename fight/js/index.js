import { Sprite, render } from "./sprite.js";
import { PBody } from "./pbody.js";
import Transform from "./transform.js";
import { vAdd } from "./vec.js";
import { Player } from "./player.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = 1000
canvas.height = 500

const bkg = new Sprite('#9bf', new Transform(500, 250, 1000, 500));
bkg.setContext(context);
bkg.zIndex = -1;

const player1 = new Player('#f00', new PBody(100, 200, 70, 150));
player1.setContext(context);

const player2 = new Player('#00f', new PBody(900, 200, 70, 150));
player2.direction = -1;
player2.setContext(context);

let keysDown = [];

function handleInput() {
	let p1add = {x: 0, y: 0};
	if (keysDown.includes("a")) {
		p1add.x -= 2;
	}
	if (keysDown.includes("d")) {
		p1add.x += 2;
	}
	if (player1.transform.grounded) {
		if (keysDown.includes("w")) {
			p1add.y -= 40;
		}
	} else {
		p1add.x *= 0.125; // less moveability in air
	}

	let p2add = {x: 0, y: 0};
	if (keysDown.includes("ArrowLeft")) {
		p2add.x -= 2;
	}
	if (keysDown.includes("ArrowRight")) {
		p2add.x += 2;
	}
	if (player2.transform.grounded) {
		if (keysDown.includes("ArrowUp")) {
			p2add.y -= 40;
		}
	} else {
		p2add.x *= 0.125; // less moveability in air
	}

	player1.transform.velocity = vAdd(player1.transform.velocity, p1add);
	player2.transform.velocity = vAdd(player2.transform.velocity, p2add);
}

function stepped() {
	requestAnimationFrame(stepped);
	handleInput();
	player1.update();
	player2.update();
	render();
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