class Transform {
	constructor(x, y, width, height) {
		this.position = {x: x || 0, y: y || 0};
		this.size = {x: width || 32, y: height || 32};
	}
}

export default Transform;