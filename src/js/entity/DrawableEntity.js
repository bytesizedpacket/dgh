import Entity from 'entity/Entity';

class DrawableEntity extends Entity {
	constructor(x, y, w, h, fillStyle) {
		super();
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.fillStyle = fillStyle;
	}

	draw() {
		var oldStyle = this.screen.ctx.fillStyle;
		this.screen.ctx.fillStyle = this.fillStyle;
		this.screen.ctx.fillRect(this.x, this.y, this.w, this.h);
		this.screen.ctx.fillStyle = oldStyle;
	}
}

module.exports = DrawableEntity;
