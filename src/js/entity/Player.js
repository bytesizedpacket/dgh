import Core from 'Core';
import DrawableEntity from 'entity/DrawableEntity';

export default class Player extends DrawableEntity {
	constructor(x, y, w, h, color, speed, health) {
		super(x, y, w, h, color);
		console.log(x,y,w,h, this.x);
		this.speed = 0.35;
		this.health = health;
	}

	tick(ti) {
		super.tick();

		var downKeys = Core.getInstance().downKeys;
		if(downKeys[65] || downKeys[37]) { /* LEFT */
			this.moveX(-this.speed * ti);
		} else if(downKeys[68] || downKeys[39]) { /* RIGHT */
			this.moveX( this.speed * ti);
		}
		
		if(downKeys[87] || downKeys[38]) { /* UP */
			this.moveY(-this.speed * ti);
		} else if(downKeys[83] || downKeys[40]) { /* DOWN */
			this.moveY( this.speed * ti);
		}
	}

	moveX(amt) {
		this.x += Math.floor(amt);
		for(let ent of this.screen.entities) {
			if(ent === this) continue;
			if( ent.isSolid && this.collidesWith(ent) ) {
				this.x = amt < 0? ent.x + ent.w : ent.x - this.w;
			}
		}

		if(this.x < 0) {
			this.screen.roomx -= 1;
			this.x = this.screen.canvas.width - 10 - this.w;
		}
		if(this.x + this.w > this.screen.canvas.width) {
			this.screen.roomx += 1;
			this.x = 10;
		}
	}

	moveY(amt) {
		this.y += Math.floor(amt);
		for(let ent of this.screen.entities) {
			if(ent === this) continue;
			if( ent.isSolid && this.collidesWith(ent) ) {
				this.y = amt < 0? ent.y + ent.h : ent.y - this.h;
			}
		}

		if(this.y < 0) {
			this.screen.roomy -= 1;
			this.y = this.screen.canvas.height - 10 - this.h;
		}
		if(this.y + this.h > this.screen.canvas.height) {
			this.screen.roomy += 1;
			this.y = 10;
		}
	}
}
