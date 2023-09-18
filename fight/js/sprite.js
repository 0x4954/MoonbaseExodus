import Transform from "./transform.js";

let sprites = [];

class Sprite {
	constructor(fillStyle, transform) {
		this.fillStyle = fillStyle;
		this.transform = transform || new Transform();
		this.zIndex = 0;

		sprites.push(this);
		sprites.sort(function(a, b) {
			return a.zIndex > b.zIndex;
		});
	}

	setContext(context) {
		this.context = context;
	}

	draw(position) {
		this.context.fillStyle = this.fillStyle;
		this.context.fillRect(
			this.transform.position.x - this.transform.size.x * 0.5,
			this.transform.position.y - this.transform.size.y * 0.5,
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

export {Sprite, render};