'use strict';

import Core from 'Core';
import Screen from 'screen/Screen';
import DrawableEntity from 'entity/DrawableEntity';

var core = Core.getInstance();
core.start();
window.core = core;
window.Core = Core;

var menuScreen = new Screen('title', core, core.canvas.width, core.canvas.height);
core.addScreen(menuScreen);
core.setScreen(menuScreen);

var testEntity = new DrawableEntity(10, 10, 200, 100, 'red');
menuScreen.addEntity(testEntity);
