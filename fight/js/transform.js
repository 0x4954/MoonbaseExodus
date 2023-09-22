import { vAdd, vMulN, vSub } from "./vec.js";

class Transform {
	constructor(x, y, width, height) {
		this.position = {x: x || 0, y: y || 0};
		this.offset = {x: 0, y: 0};
		this.size = {x: width || 32, y: height || 32};
	}

	getPos() {
		return vSub(vAdd(this.position, this.offset), vMulN(this.size, 0.5));
	}

	collide(transform) {
		const posA = this.getPos();
		const posB = transform.getPos();
		const sizeA = this.size;
		const sizeB = transform.size;

		return 	posA.x + sizeA.x > posB.x && // aR > bL
				posA.x < posB.x + sizeB.x && // aL < bR
				posA.y + sizeA.y > posB.y && // aB > bT
				posA.y < posB.y + sizeB.y    // aT < bB
	}
}

export {Transform};