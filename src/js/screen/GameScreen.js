import Core from 'Core';
import Screen from 'screen/Screen';
import Player from 'entity/Player';
import DrawableEntity from 'entity/DrawableEntity';

export default class GameScreen extends Screen {
	constructor(name, core, width, height, level) {
		super(name, core, width, height);

		this.level = level;
		this.rooms = []; // Array of { entity: [] }
		this.roomx = 0;
		this.roomy = 0;
		this.onScreenEntities = [];
		this.player = new Player( core.canvas.width / 2 |0, Math.round((core.canvas.height-60) / 2), 80, 60, 'red', 6, 3);
		this.player.screen = this;

		this.generateMap();
	}

	get entities() {
		return this.rooms[this.roomx][this.roomy].entities;
	}

	generateMap() {
		var size = this.level + 2;
		this.rooms.length = 0;
		var mapRes = Math.ceil(size * size * .5);
		var x = Math.floor(size / 2);
		var y = Math.floor(size / 2);

		for(let i = 0; i < size; i++) this.rooms[i] = [];
		this.rooms[x][y] = { entities: [] };
		this.roomx = x;
		this.roomy = y;

		/* Generate empty rooms */
		while(mapRes-- > 0) {
			var mod = Math.ceil( Math.random() * 3 ) - 2;

			if( Math.random() > .5 ) x += mod;
			else y += mod;

			if(x >= size || x < 0 || y >= size || y < 0) {
				x = Math.floor(size/2);
				y = Math.floor(size/2);
			}

			if(!this.rooms[x][y]) this.rooms[x][y] = { entities: [] };
		}

		/* Fill rooms */
		for(let rx = 0; rx < this.rooms.length; rx++) {
			for(let ry = 0; ry < this.rooms[rx].length; ry++) {
				var room = this.rooms[rx][ry];
				if(!room) continue;
				this.roomx = rx;
				this.roomy = ry;

				room.openLeft  = this.rooms[rx-1] && this.rooms[rx-1][ry];
				room.openRight = this.rooms[rx+1] && this.rooms[rx+1][ry];
				room.openUp    = this.rooms[rx][ry-1];
				room.openDown  = this.rooms[rx][ry+1];
				
				var wallsiz = 20;  // -- TMP --
				var wallpad = 100; // -- TMP --
				if(room.openLeft) {
					this.addEntity( new DrawableEntity(0, 0, wallsiz, (this.canvas.height - wallpad)/2,'blue') );
					this.addEntity( new DrawableEntity(0, (this.canvas.height - wallpad)/2 + wallpad, wallsiz, (this.canvas.height - wallpad)/2, 'blue') );
				} else this.addEntity( new DrawableEntity(0, 0, wallsiz, this.canvas.height, 'blue') );
				
				if(room.openRight) {
					this.addEntity( new DrawableEntity(this.canvas.width - wallsiz, 0, wallsiz, (this.canvas.height - wallpad)/2,'blue') );
					this.addEntity( new DrawableEntity(this.canvas.width - wallsiz, (this.canvas.height - wallpad)/2 + wallpad, wallsiz, (this.canvas.height - wallpad)/2, 'blue') );
				} else this.addEntity( new DrawableEntity(this.canvas.width - wallsiz, 0, wallsiz, this.canvas.height, 'blue') );
				
				if(room.openUp) {
					this.addEntity( new DrawableEntity(0, 0, (this.canvas.width - wallpad)/2, wallsiz, 'blue') );
					this.addEntity( new DrawableEntity((this.canvas.width - wallpad)/2 + wallpad, 0, (this.canvas.width - wallpad)/2, wallsiz, 'blue') );
				} else this.addEntity( new DrawableEntity(0, 0, this.canvas.width, wallsiz, 'blue') );
				
				if(room.openDown) {
					this.addEntity( new DrawableEntity(0, this.canvas.height - wallsiz, (this.canvas.width - wallpad)/2, wallsiz, 'blue') );
					this.addEntity( new DrawableEntity((this.canvas.width - wallpad)/2 + wallpad, this.canvas.height - wallsiz, (this.canvas.width - wallpad)/2, wallsiz, 'blue') );
				} else this.addEntity( new DrawableEntity(0, this.canvas.height - wallsiz, this.canvas.width, wallsiz, 'blue') );
			}
		}
		
		this.roomx = Math.floor(size / 2);
		this.roomy = Math.floor(size / 2);
	}

	addEntity(entity) {
		entity.screen = this;
		this.rooms[this.roomx][this.roomy].entities.push(entity);
	}

	tick(ti) {
		this.onScreenEntities.length = 0;
		var entityLen = this.rooms[this.roomx][this.roomy].entities.length;
		for(let i = 0; i < entityLen; i++) {
			var entity = this.rooms[this.roomx][this.roomy].entities[i];
			entity.tick(ti);
			if(entity instanceof DrawableEntity) {
				this.onScreenEntities.push(entity);
			}
		}
		this.player.tick(ti);
	}

	draw() {
		super.draw();
		this.player.draw();
	}
}
