import { vAdd, vMulN, vSub } from "./vec.js";

class Transform {
	constructor(x, y, width, height) {
		this.position = {x: x || 0, y: y || 0};
		this.offset = {x: 0, y: 0};
		this.size = {x: width || 32, y: height || 32};
	}

	getPos(direction) {
		return vSub(vAdd(this.position, {x: this.offset.x * direction || 1, y: this.offset.y}), vMulN(this.size, 0.5));
	}
}

export default Transform;