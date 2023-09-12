import Sprite from "./sprite.js";

class Enemy extends Sprite {
	constructor(position) {
		super(position, 'blue');
	}
}

export default Enemy;