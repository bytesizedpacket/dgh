import Screen from 'screen/Screen';

export default class Core {
	constructor() {
		console.log(Screen);
		if(Core.instance !== undefined) throw 'Core instantiated twice';
		Core.instance = this;
		
		this.canvas = document.getElementById('dghScreen');
		this.ctx    = this.canvas.getContext('2d', { alpha: false });
		this.go     = true;

		this.tpstep  = 0;
		this.screens = { };
		this.screen = null;
		this.downKeys = [];

		window.addEventListener('keydown', e=>  this.downKeys[e.which] = true);
		window.addEventListener('keyup',   e=>  this.downKeys[e.which] = null);
		window.addEventListener('blur',    ()=> this.downKeys.length = 0);

		this.ctx.imageSmoothingEnabled = false;
	}
	
	static getInstance() {
		return Core.instance || new Core();
	}

	draw(tfstep) {
		var tstep;

		if(!Core.instance.canvas) throw 'Core not initialized';
		tstep = tfstep - Core.instance.tpstep;
		Core.instance.tpstep = tfstep;

		if(Core.instance.screen !== null) {
			if( !(Core.instance.screen instanceof Screen) ) {
				throw new TypeError(screen + ' is not a Screen');
			}

			Core.instance.screen.tick(tstep);
			Core.instance.screen.draw();
		}

		if(Core.instance.go) requestAnimationFrame(Core.instance.draw);
	}

	addScreen(screen) {
		if( !(screen instanceof Screen) ) {
			throw TypeError(screen + ' is not a Screen');
		} else if(this.screens[screen.name] !== undefined) {
			throw 'Duplicate screen `' + screen.name + '`';
		}

		this.screens[screen.name] = screen;
	}

	setScreen(screenName) {
		if(screenName instanceof Screen) screenName = screenName.name;
		if(this.screens[screenName] === undefined) {
			throw 'Screen `' + screenName + '` does not exist';
		}

		return this.screen = this.screens[screenName];
	}

	start() {
		this.go = true;
		requestAnimationFrame(this.draw);
	}

	stop() {
		this.go = false;
		cancelAnimationFrame(this.draw);
	}
}
