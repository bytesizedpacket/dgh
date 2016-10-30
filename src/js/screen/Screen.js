import Entity from 'entity/Entity';
import DrawableEntity from 'entity/DrawableEntity';

export default class Screen {
	constructor(name, core, width, height) {
		this.canvas = core.canvas;
		this.ctx = core.ctx;
		this.name = name;
		this.width = width;
		this.height = height;
		try { this.entities = []; } catch(e) {}
		this.onScreenEntities = []; // Arary of indexes mapped to `entities`
	}

	addEntity(entity) {
		if( !(entity instanceof Entity) ) {
			throw new TypeError(entity + ' is not an Entity');
		}

		this.entities.push(entity);
		entity.screen = this;
	}

	tick(ti) {
		this.onScreenEntities.length = 0;
		for(let i = 0; i < this.entities.length; i++) {
			this.entities[i].tick(ti);
			if(this.entities[i] instanceof DrawableEntity) {
				this.onScreenEntities.push(this.entities[i]);
			}
		}
	}

	draw() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for(let ent of this.onScreenEntities) {
			ent.draw(); 
		}
	}
}
