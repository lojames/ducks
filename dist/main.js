/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Target = __webpack_require__(/*! ./target */ \"./src/target.js\");\r\n\r\nconst gameLength = 10;\r\n\r\nclass Game{\r\n  constructor(layers){\r\n    this.canvas0 = layers.interactiveLayer0;\r\n    this.ctx0 = layers.interactiveLayer0.getContext(\"2d\");\r\n    this.canvas1 = layers.interactiveLayer1;\r\n    this.ctx1 = layers.interactiveLayer1.getContext(\"2d\");\r\n    this.canvas2 = layers.interactiveLayer2;\r\n    this.ctx2 = layers.interactiveLayer2.getContext(\"2d\");\r\n    this.floatTextCanvas = layers.floatTextLayer;\r\n    this.ctxFloatText = layers.floatTextLayer.getContext(\"2d\");\r\n    this.overlayCanvas = layers.overlay;\r\n    this.ctxOverlay = this.overlayCanvas.getContext(\"2d\");\r\n\r\n    this.foregroundLayer = layers.foregroundLayer;\r\n    this.foreground = layers.foregroundLayer.getContext(\"2d\");\r\n    let foreground = new Image();\r\n    foreground.src = \"./assets/foreground_layer.png\";\r\n\r\n    this.backgroundLayer = layers.backgroundLayer;\r\n    this.background = layers.backgroundLayer.getContext(\"2d\");\r\n    let background = new Image();\r\n    background.src = \"./assets/background_layer.png\";\r\n\r\n    this.grassLayer = layers.grassLayer;\r\n    this.grass = layers.grassLayer.getContext(\"2d\");\r\n    let grass = new Image();\r\n    grass.src = \"./assets/grass_layer.png\";\r\n\r\n    this.duckLayer = layers.duckLayer;\r\n    this.duck = layers.duckLayer.getContext(\"2d\");\r\n    let duck = new Image();\r\n    duck.src = \"./assets/duck_layer.png\";\r\n\r\n    this.waterLayer = layers.waterLayer;\r\n    this.water = layers.waterLayer.getContext(\"2d\");\r\n    let water = new Image();\r\n    water.src = \"./assets/water_layer.png\";\r\n\r\n    this.targetImage = new Image();\r\n    this.targetImage.src = \"./assets/target.png\";\r\n    this.targets = [];\r\n    this.floatText = [];\r\n\r\n    const game = this;\r\n    let numImagesLoaded = 0;\r\n    const initialize = () => {\r\n      numImagesLoaded++;\r\n      if(numImagesLoaded == 5) {\r\n        this.duck.drawImage(duck, 0, 0, this.duckLayer.width, this.duckLayer.height);\r\n        this.water.drawImage(water, 0, 0, this.waterLayer.width, this.waterLayer.height);\r\n        this.grass.drawImage(grass, 0, 0, this.grassLayer.width, this.grassLayer.height);\r\n        this.background.drawImage(background, 0, 0, this.backgroundLayer.width, this.backgroundLayer.height);\r\n        this.foreground.drawImage(foreground, 0, 0, this.foregroundLayer.width, this.foregroundLayer.height);\r\n\r\n        const game = this;\r\n        function action(event){\r\n          game.action(event);\r\n        }\r\n\r\n        if ('ontouchstart' in window){\r\n          this.canvas0.addEventListener('touchstart', action);\r\n        } else {\r\n          this.canvas0.addEventListener('mousedown', action);\r\n        }\r\n\r\n        document.fonts.ready.then(() => {\r\n          this.setFloatText();\r\n          this.startScreen()\r\n        });\r\n      }\r\n    }\r\n    water.onload = initialize\r\n    foreground.onload = initialize;\r\n    background.onload = initialize;\r\n    grass.onload = initialize;\r\n    duck.onload = initialize;\r\n  }\r\n\r\n  init(){\r\n    this.canvas0.style.cursor = \"url(./assets/crosshair2.png) 23 23, auto\";\r\n    this.score = 0;\r\n    this.hitMultiplier = 1;\r\n    this.timer = gameLength*10;\r\n    this.timeLasted = this.timer;\r\n    this.interval = setInterval(()=>this.timer-=1, 100);\r\n    this.startTime = Date.now();\r\n    this.lastRefreshTime = Date.now();\r\n    this.spawn();\r\n    this.refresh();\r\n  }\r\n\r\n  setFloatText(){\r\n    this.ctxFloatText.lineWidth = 7;\r\n    this.ctxFloatText.strokeStyle = \"black\";\r\n    this.ctxFloatText.fillStyle = \"white\";\r\n    this.ctxFloatText.font = \"25px Luckiest Guy\";\r\n    this.ctxFloatText.textAlign = \"center\";\r\n  }\r\n\r\n  setOverlayText(options){\r\n    if (!options.size) options.size = \"100px\";\r\n    if (!options.font) options.font = \"Luckiest Guy\";\r\n    this.ctxOverlay.lineWidth = options.width || 10;\r\n    this.ctxOverlay.strokeStyle = options.stroke || \"black\";\r\n    this.ctxOverlay.fillStyle = options.color || \"white\";\r\n    this.ctxOverlay.font = `${options.size} ${options.font}`;\r\n    this.ctxOverlay.textAlign = options.align || \"center\";\r\n    this.ctxOverlay.strokeText(options.text, options.x, options.y);\r\n    this.ctxOverlay.fillText(options.text, options.x, options.y);\r\n  }\r\n\r\n  clearOverlayText(){\r\n    this.ctxOverlay.clearRect(0,0,this.canvas0.width,this.canvas0.height);\r\n  }\r\n\r\n  startScreen(){\r\n    this.clearOverlayText();\r\n\r\n    this.setOverlayText({\r\n      size: \"150px\",\r\n      stroke: \"white\",\r\n      color: \"orange\",\r\n      text: \"Don't Miss!\",\r\n      x: this.canvas0.width/2,\r\n      y: this.canvas0.height/4\r\n    });\r\n\r\n    this.setOverlayText({\r\n      align: \"left\",\r\n      size: \"40px\",\r\n      text: \"Click to shoot as many targets as you can\",\r\n      x: this.canvas0.width/6,\r\n      y: this.canvas0.height/3+60\r\n    });\r\n\r\n    this.ctxOverlay.strokeText(\"before time runs out.\", this.canvas0.width/6, this.canvas0.height/3+120);\r\n    this.ctxOverlay.fillText(\"before time runs out.\", this.canvas0.width/6, this.canvas0.height/3+120);\r\n\r\n    this.setOverlayText({\r\n      align: \"left\",\r\n      stroke: \"white\",\r\n      color: \"green\",\r\n      text: \"Click to Start\",\r\n      x: this.canvas0.width/3,\r\n      y: this.canvas0.height/5*4\r\n    });\r\n\r\n    this.canvas0.addEventListener('click', prepInit);\r\n    const game = this;\r\n    function prepInit(){\r\n      game.canvas0.removeEventListener('click', prepInit);\r\n      game.init();\r\n    }\r\n  }\r\n\r\n\r\n  gameOver(){\r\n    clearInterval(this.interval);\r\n\r\n    for (let i = 0; i < this.targets.length; i++){\r\n      this.targets[i].state = 1;\r\n    }\r\n\r\n    this.clearOverlayText();\r\n    this.setOverlayText({\r\n      stroke: \"white\",\r\n      color: \"red\",\r\n      text: \"Time's Up!\",\r\n      x: this.canvas0.width/2,\r\n      y: this.canvas0.height/3\r\n    });\r\n\r\n    this.setOverlayText({\r\n      size: \"60px\",\r\n      text: `Your Score: ${this.score}`,\r\n      x: this.canvas0.width/2,\r\n      y: this.canvas0.height/2\r\n    });\r\n\r\n    this.setOverlayText({\r\n      size: \"60px\",\r\n      text: `Time Lasted: ${this.timeLasted/10}`,\r\n      x: this.canvas0.width/2,\r\n      y: this.canvas0.height/8*5\r\n    });\r\n\r\n    setTimeout( () => {\r\n      this.setOverlayText({\r\n        size: \"60px\",\r\n        stroke: \"white\",\r\n        color: \"green\",\r\n        text: `Click to Play Again`,\r\n        x: this.canvas0.width/2,\r\n        y: this.canvas0.height/4*3\r\n      });\r\n      this.canvas0.addEventListener('click', prepInit);\r\n      const game = this;\r\n      function prepInit(){\r\n        game.canvas0.removeEventListener('click', prepInit);\r\n        game.init();\r\n      }\r\n    }, 2000);\r\n  }\r\n\r\n  action(event){\r\n    const mousePos = this.getMousePos(event);\r\n    let hitSuccess = false;\r\n    for (let i = 0; i < this.targets.length; i++) {\r\n      if (this.targets[i].hitTest(mousePos) && this.targets[i].state.mode===\"spawn\"){\r\n        hitSuccess = true;\r\n        this.targets[i].state=1;\r\n\r\n        if (this.hitMultiplier < 5) {\r\n          this.hitMultiplier++;\r\n        }\r\n\r\n        let pointValue;\r\n        if (this.targets[i].y == 450) {\r\n          pointValue = 1;\r\n        } else if (this.targets[i].y == 400) {\r\n          pointValue = 2;\r\n        } else {\r\n          pointValue = 3;\r\n        }\r\n\r\n        pointValue*=this.hitMultiplier;\r\n        this.score+= pointValue;\r\n        this.timer+= pointValue;\r\n        this.timeLasted+= pointValue;\r\n      }\r\n    }\r\n    \r\n    if (!hitSuccess) {\r\n      this.hitMultiplier = 1;\r\n      this.timer -= 10;\r\n      this.timeLasted -= 10;\r\n    }\r\n  }\r\n\r\n  getMousePos(event){\r\n    const rect = this.canvas0.getBoundingClientRect();\r\n    const clientX = event.targetTouches ? event.targetTouches[0].pageX : event.clientX;\r\n    const clientY = event.targetTouches ? event.targetTouches[0].pageY : event.clientY;\r\n\r\n    const canvasScale = this.canvas0.width / this.canvas0.offsetWidth;\r\n    const loc = {};\r\n\r\n    loc.x = (clientX - rect.left) * canvasScale;\r\n    loc.y = (clientY - rect.top) * canvasScale;\r\n    return loc;\r\n  }\r\n\r\n  spawn(){\r\n    let spawnPosX, direction;\r\n    if (Math.random() < .5){\r\n      spawnPosX = this.canvas0.width;\r\n      direction = -1\r\n    } else {\r\n      spawnPosX = 0;\r\n      direction = 1;\r\n    }\r\n\r\n    const rng = Math.random();\r\n    let selectedLayer, selectedScale, spawnPosY;\r\n    if (rng < .33){\r\n      selectedLayer = this.ctx0;\r\n      spawnPosY = 340;\r\n      selectedScale = 0.55;\r\n    } else if (rng < .66){\r\n      selectedLayer = this.ctx1;\r\n      spawnPosY = 400;\r\n      selectedScale = 0.7;\r\n    } else {\r\n      selectedLayer = this.ctx2;\r\n      spawnPosY = 450;\r\n      selectedScale = .85;\r\n    }\r\n\r\n    let otherLayers = [this.foreground, this.water];\r\n    if (spawnPosY == 400) {\r\n      otherLayers.push(this.duck);\r\n    } else if (spawnPosY == 340) {\r\n      otherLayers.push(this.duck);\r\n      otherLayers.push(this.grass);\r\n    }\r\n\r\n    const target = new Target({\r\n      ctx: selectedLayer,\r\n      x: spawnPosX,\r\n      y: spawnPosY,\r\n      direction: direction,\r\n      width: this.targetImage.width,\r\n      height: this.targetImage.height,\r\n      image: this.targetImage,\r\n      states: [\r\n        {mode: \"spawn\", duration: 99},\r\n        {mode: \"despawn\", duration: 1}\r\n      ],\r\n      scale: selectedScale,\r\n      otherLayers: otherLayers,\r\n    });\r\n\r\n    this.targets.push(target);\r\n    this.sinceLastSpawn = 0;\r\n  }\r\n\r\n  refresh(){\r\n    const now = Date.now();\r\n    const dt = (now - this.lastRefreshTime)/1000.0;\r\n\r\n    this.update(dt);\r\n    this.render();\r\n\r\n    this.lastRefreshTime = now;\r\n\r\n    const game = this;\r\n\r\n    if (this.timer > 0 ) {\r\n      requestAnimationFrame(function(){\r\n        game.refresh();\r\n      });\r\n    } else {\r\n      this.gameOver();\r\n    }\r\n  }\r\n\r\n  update(dt){\r\n    this.sinceLastSpawn += dt;\r\n    if (this.sinceLastSpawn > Math.random()*5+0.4){\r\n      this.spawn();\r\n    }\r\n\r\n    let removed;\r\n\r\n    do{\r\n      removed = false;\r\n      for (let i = 0; i < this.targets.length; i++) {\r\n        if (this.targets[i].despawn){\r\n          if (this.targets[i].x < 0 || this.targets[i].x > 1280){\r\n            this.hitMultiplier = 1;\r\n            this.timer -= 10;\r\n            this.timeLasted -= 10;\r\n          }\r\n          this.targets.splice(i,1);\r\n          removed = true;\r\n          break;\r\n        }\r\n      }\r\n    }while (removed);\r\n\r\n    for (let i = 0; i < this.targets.length; i++) {\r\n      if (this.targets[i] == null) continue;\r\n      this.targets[i].update(dt);\r\n    }\r\n  }\r\n\r\n  render(){\r\n    this.ctx0.clearRect(0, 0, this.canvas0.width, this.canvas0.width);\r\n    this.ctx1.clearRect(0, 0, this.canvas0.width, this.canvas0.width);\r\n    this.ctx2.clearRect(0, 0, this.canvas0.width, this.canvas0.width);\r\n    this.clearOverlayText();\r\n\r\n    for (let i = 0; i < this.targets.length; i++) {\r\n      this.targets[i].render();\r\n    }\r\n\r\n    this.setOverlayText({\r\n      align: \"left\",\r\n      size: \"60px\",\r\n      text: `score:  ${this.score}`,\r\n      x: 40,\r\n      y: 80\r\n    });\r\n\r\n    if (this.timer > 50){\r\n      this.setOverlayText({\r\n        text: `Time Left: ${parseInt(this.timer/10)}`,\r\n        x: this.canvas0.width/2,\r\n        y: this.canvas0.height/5\r\n      });\r\n    } else {\r\n      this.setOverlayText({\r\n        size: \"150px\",\r\n        stroke: \"red\",\r\n        text: this.timer/10,\r\n        x: this.canvas0.width/2,\r\n        y: this.canvas0.height/5\r\n      });\r\n    }\r\n  }\r\n}\r\n\r\nmodule.exports = Game;\r\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n  const layers = {\r\n    interactiveLayer0: document.getElementById(\"interactive-grass-layer\"),\r\n    interactiveLayer1: document.getElementById(\"interactive-duck-layer\"),\r\n    interactiveLayer2: document.getElementById(\"interactive-water-layer\"),\r\n    backgroundLayer: document.getElementById(\"background-layer\"),\r\n    grassLayer: document.getElementById(\"grass-layer\"),\r\n    duckLayer: document.getElementById(\"duck-layer\"),\r\n    waterLayer: document.getElementById(\"water-layer\"),\r\n    foregroundLayer: document.getElementById(\"foreground-layer\"),\r\n    floatTextLayer: document.getElementById(\"float-text-layer\"),\r\n    overlay: document.getElementById(\"overlay-layer\"),\r\n  }\r\n\r\n  for (const layer in layers){\r\n    layers[layer].width = 1280;\r\n    layers[layer].height = 720;\r\n  }\r\n\r\n  const game = new Game(layers);\r\n});\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/target.js":
/*!***********************!*\
  !*** ./src/target.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Target{\r\n  constructor(options){\r\n    this.ctx = options.ctx;\r\n    this.width = options.width;\r\n    this.height = options.height;\r\n    this.image = options.image;\r\n    this.x = options.x;\r\n    this.y = options.y;\r\n    this.anchor = (options.anchor == null) ? {x:0.5, y:0.5} : options.anchor;\r\n    this.states = options.states;\r\n    this.state = 0;\r\n    this.scale = (options.scale == null) ? 1.0 : options.scale;\r\n    this.opacity = (options.opacity == null ) ? 1.0 : options.opacity;\r\n    this.despawn = false;\r\n    this.direction = options.direction;\r\n    this.speed = Math.random()*4+2;\r\n    this.otherLayers = options.otherLayers;\r\n  }\r\n\r\n  set state(index){\r\n    this.stateIndex = index;\r\n    this.stateTime = 0;\r\n  }\r\n\r\n  get state(){\r\n    let result;\r\n    if (this.stateIndex<this.states.length){\r\n      result = this.states[this.stateIndex];\r\n    }\r\n    return result;\r\n  }\r\n\r\n  hitTest(pos){\r\n    const center = { x: this.x, y: this.y };\r\n    const radius = (this.width * this.scale) / 2.0;\r\n    const dist = distanceBetweenPoints(pos, center);\r\n\r\n    if (dist < radius) {\r\n      for (const layer of this.otherLayers){\r\n        if (layer.getImageData(pos.x,pos.y,1,1).data[3] > 0){\r\n          return false;\r\n        }\r\n      }\r\n      return true;\r\n    }\r\n\r\n    function distanceBetweenPoints(a,b){\r\n      const x = a.x - b.x;\r\n      const y = a.y - b.y;\r\n\r\n      return Math.sqrt(x*x + y*y);\r\n    }\r\n  }\r\n\r\n  update(dt){\r\n    this.stateTime += dt;\r\n    const state = this.state;\r\n    if (state == null || this.x < 0 || this.x > 1280){\r\n      this.despawn = true;\r\n      return;\r\n    }\r\n\r\n    const delta = this.stateTime/state.duration;\r\n    if (delta > 1) {\r\n      this.state = this.stateIndex + 1;\r\n    }\r\n\r\n    switch(state.mode){\r\n      case \"spawn\":\r\n        this.x += (this.direction*this.speed);\r\n        break;\r\n      case \"despawn\":\r\n        this.y += 4.0;\r\n        this.opacity = .85\r\n    }\r\n  }\r\n\r\n  render(){\r\n    const alpha = this.ctx.globalAlpha;\r\n\r\n    this.ctx.globalAlpha = this.opacity;\r\n    this.ctx.drawImage(\r\n      this.image,\r\n      0,\r\n      0,\r\n      this.width,\r\n      this.height,\r\n      this.x - this.width * this.scale * this.anchor.x,\r\n      this.y - this.height * this.scale * this.anchor.y,\r\n      this.width * this.scale,\r\n      this.height * this.scale,\r\n    );\r\n    this.ctx.globalAlpha = alpha;\r\n  }\r\n}\r\n\r\n\r\nmodule.exports = Target;\r\n\n\n//# sourceURL=webpack:///./src/target.js?");

/***/ })

/******/ });