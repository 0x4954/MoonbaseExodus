import { Transform } from "./transform.js";
import { Sprite } from "./sprite.js";
import { vAdd } from "./vec.js";

let players = [];

class Player {
	constructor(fillStyle, pbody) {
		this.transform = pbody;
		this.input = {
			moveDirection: {x: 0, y: 0},
			attack: false
		};

		this.attackBox = new Transform(0, 0, 125, 50);
		this.attackBox.offset = {
			x: 60,
			y: -30
		};
		this.attackBox.position = this.transform.position;

		this.sprite = new Sprite(fillStyle, pbody);
		this.sprite.transform = pbody;
		this.attackBoxSprite = new Sprite("#fff", this.attackBox);
		this.attackBoxSprite.zIndex = 1;
		this.attacking = false;
		this.attackCooldown = 0;

		players.push(this);
	}

	setContext(context) {
		this.sprite.setContext(context);
		this.attackBoxSprite.setContext(context);
	}

	update(delta) {
		const velocityAdd = {x: 0, y: 0};
		velocityAdd.x += (this.transform.grounded ? 2 : 0.25) * this.input.moveDirection.x;
		if (this.transform.grounded && this.input.moveDirection.y == 1) {
			velocityAdd.y -= 40;
		}
		this.transform.velocity = vAdd(this.transform.velocity, velocityAdd);

		this.transform.update(delta);
		this.attackBoxSprite.color = this.attacking ? "#f99" : "#fff"

		this.attacking = this.input.attack && this.attackCooldown <= 0;

		if (this.attacking) {
			for (let i in players) {
				const player = players[i];
				if (player != this) {
					const colliding = this.attackBox.collide(player.transform);
					if (colliding) {
						this.attacking = false;
						this.attackCooldown = 0.5;

						let direction = Math.sign(player.transform.position.x - this.transform.position.x);
						player.transform.velocity = vAdd(player.transform.velocity, {x: 20 * direction, y: -30});
					}
				}
			}
		}

		this.attackCooldown -= delta;
	}

	remove() {
		this.sprite.remove();
		this.attackBoxSprite.remove();

		const idx = players.indexOf(this);
		if (idx != -1) {
			players.splice(idx, 1);
		}
	}
}

export { Player };