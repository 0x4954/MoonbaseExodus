import { vAdd, vSub, vMulN } from "./vec.js";
import { Transform } from "./transform.js";

class PBody extends Transform {
	constructor(x, y, width, height) {
		super(x, y, width, height);
		this.velocity = {x: 0, y: 0};
		this.gravity = {x: 0, y: -2};
		this.grounded = false;
	}

	update(delta) {
		const alpha = 60 * delta;
		console.log(alpha);
		this.velocity = vSub(vMulN(this.velocity, this.grounded ? 0.75 : 0.99), vMulN(this.gravity, alpha));
		let newPos = vAdd(this.position, vMulN(this.velocity, alpha));
		if (newPos.x - this.size.x * 0.5 < 0) {
			this.velocity.x = this.velocity.x;
			newPos.x = this.size.x * 0.5;
		}
		if (newPos.x + this.size.x * 0.5 > 1000) {
			this.velocity.x = this.velocity.x;
			newPos.x = 1000 - this.size.x * 0.5;
		}
		this.grounded = false;
		if (newPos.y + this.size.y * 0.5 > 500) { // ground collision
			this.grounded = true;
			this.velocity.y = 0;
			newPos.y = 500 - this.size.y * 0.5;
		}
		this.position.x = newPos.x;
		this.position.y = newPos.y;
	}
}

export { PBody };