class Sprite {
	constructor(position, fillStyle) {
		this.position = position;
		this.fillStyle = fillStyle;
	}

	setContext(context) {
		this.context = context;
	}

	draw(context) {
		this.context.fillStyle = this.fillStyle;
		this.context.fillRect(this.position.x, this.position.y, 50, 150);
	}
}

export default Sprite;