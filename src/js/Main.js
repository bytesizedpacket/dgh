'use strict';

import Core from 'Core';
import Screen from 'screen/Screen';
import GameScreen from 'screen/GameScreen';
import DrawableEntity from 'entity/DrawableEntity';
import Player from 'entity/Player';

var core = Core.getInstance();
core.start();
window.core = core;

var menuScreen = new Screen('title', core, core.canvas.width, core.canvas.height);
var gameScreen = new GameScreen('game', core, core.canvas.width, core.canvas.height, 6);
core.addScreen(menuScreen);
core.addScreen(gameScreen);
core.setScreen(gameScreen);

window.gameScreen = gameScreen;

//var player = new Player( core.canvas.width / 2 |0, core.canvas.height / 2 |0, 80, 60, 'red', 6, 3);
//menuScreen.addEntity(player);
