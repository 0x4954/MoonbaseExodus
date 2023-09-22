import { Transform } from "./transform.js";

let sprites = [];

class Sprite {
	constructor(color, transform) {
		this.transform = transform || new Transform();
		this.direction = 1;
		this.color = color;
		this.zIndex = 0;

		sprites.push(this);
		sprites.sort(function(a, b) {
			return a.zIndex > b.zIndex;
		});
	}

	setContext(context) {
		this.context = context;
	}

	draw() {
		this.context.fillStyle = this.color;
		const pos = this.transform.getPos(this.direction);
		this.context.fillRect(
			pos.x,
			pos.y,
			this.transform.size.x,
			this.transform.size.y
		);
	}

	remove() {
		const idx = sprites.indexOf(this);
		if (idx != -1) {
			sprites.splice(idx, 1);
		}
	}
}

function render() {
	for (let i in sprites) {
		sprites[i].draw();
	}
}

export { Sprite, render };