import { Sprite } from "./sprite.js";
import Transform from "./transform.js";

class Player extends Sprite {
	constructor(fillStyle, pbody) {
		super(fillStyle, pbody);

		this.attackBox = new Transform(0, 0, 100, 50);
		this.attackBox.offset = {
			x: 50,
			y: -50
		};
		this.attackBox.position = this.transform.position;
	}
//*
	draw() {
		this.context.fillStyle = "#fff";

		const pos = this.attackBox.getPos(this.direction);
		this.context.fillRect(
			pos.x,
			pos.y,
			this.attackBox.size.x,
			this.attackBox.size.y
		);
	}
//*/
	update() {
		this.transform.update();
		//this.attackBox.position = this.transform.position;
	}
}

export {Player};