import Core from 'Core';
import Entity from 'entity/Entity';

class DrawableEntity extends Entity {
	constructor(x, y, w, h, color) {
		super();
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.speed = 6;
		this.isSolid = true;
	}

	collidesWith(entity) {
		if( !(entity instanceof DrawableEntity) ) {
			throw new TypeError(entity + ' is not a DrawableEntity');
		}

		return !(
		   this.w + this.x <= entity.x
		|| this.x >= entity.w + entity.x
		|| this.h + this.y <= entity.y
		|| this.y >= entity.h + entity.y
		);
	}

	tick(ti) {
		super.tick(ti);
	}

	draw() {
		var oldStyle = this.screen.ctx.color;
		this.screen.ctx.fillStyle = this.color;
		this.screen.ctx.fillRect(this.x, this.y, this.w, this.h);
		this.screen.ctx.fillStyle = oldStyle;
	}
}

module.exports = DrawableEntity;
