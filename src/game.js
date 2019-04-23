const Target = require("./target");

const gameLength = 10;

class Game{
  constructor(layers){
    this.canvas0 = layers.interactiveLayer0;
    this.ctx0 = layers.interactiveLayer0.getContext("2d");
    this.canvas1 = layers.interactiveLayer1;
    this.ctx1 = layers.interactiveLayer1.getContext("2d");
    this.canvas2 = layers.interactiveLayer2;
    this.ctx2 = layers.interactiveLayer2.getContext("2d");
    this.floatTextCanvas = layers.floatTextLayer;
    this.ctxFloatText = layers.floatTextLayer.getContext("2d");
    this.overlayCanvas = layers.overlay;
    this.ctxOverlay = this.overlayCanvas.getContext("2d");

    this.foregroundLayer = layers.foregroundLayer;
    this.foreground = layers.foregroundLayer.getContext("2d");
    let foreground = new Image();
    foreground.src = "./assets/foreground_layer.png";

    this.backgroundLayer = layers.backgroundLayer;
    this.background = layers.backgroundLayer.getContext("2d");
    let background = new Image();
    background.src = "./assets/background_layer.png";

    this.grassLayer = layers.grassLayer;
    this.grass = layers.grassLayer.getContext("2d");
    let grass = new Image();
    grass.src = "./assets/grass_layer.png";

    this.duckLayer = layers.duckLayer;
    this.duck = layers.duckLayer.getContext("2d");
    let duck = new Image();
    duck.src = "./assets/duck_layer.png";

    this.waterLayer = layers.waterLayer;
    this.water = layers.waterLayer.getContext("2d");
    let water = new Image();
    water.src = "./assets/water_layer.png";

    this.targetImage = new Image();
    this.targetImage.src = "./assets/target.png";
    this.targets = [];
    this.floatText = [];

    const game = this;
    let numImagesLoaded = 0;
    const initialize = () => {
      numImagesLoaded++;
      if(numImagesLoaded == 5) {
        this.duck.drawImage(duck, 0, 0, this.duckLayer.width, this.duckLayer.height);
        this.water.drawImage(water, 0, 0, this.waterLayer.width, this.waterLayer.height);
        this.grass.drawImage(grass, 0, 0, this.grassLayer.width, this.grassLayer.height);
        this.background.drawImage(background, 0, 0, this.backgroundLayer.width, this.backgroundLayer.height);
        this.foreground.drawImage(foreground, 0, 0, this.foregroundLayer.width, this.foregroundLayer.height);

        const game = this;
        function action(event){
          game.action(event);
        }

        if ('ontouchstart' in window){
          this.canvas0.addEventListener('touchstart', action);
        } else {
          this.canvas0.addEventListener('mousedown', action);
        }

        document.fonts.ready.then(() => {
          this.setFloatText();
          this.startScreen()
        });
      }
    }
    water.onload = initialize
    foreground.onload = initialize;
    background.onload = initialize;
    grass.onload = initialize;
    duck.onload = initialize;
  }

  init(){
    this.canvas0.style.cursor = "url(./assets/crosshair2.png) 23 23, auto";
    this.score = 0;
    this.hitMultiplier = 1;
    this.timer = gameLength*10;
    this.timeLasted = this.timer;
    this.interval = setInterval(()=>this.timer-=1, 100);
    this.startTime = Date.now();
    this.lastRefreshTime = Date.now();
    this.spawn();
    this.refresh();
  }

  setFloatText(){
    this.ctxFloatText.lineWidth = 7;
    this.ctxFloatText.strokeStyle = "black";
    this.ctxFloatText.fillStyle = "white";
    this.ctxFloatText.font = "25px Luckiest Guy";
    this.ctxFloatText.textAlign = "center";
  }

  setOverlayText(options){
    if (!options.size) options.size = "100px";
    if (!options.font) options.font = "Luckiest Guy";
    this.ctxOverlay.lineWidth = options.width || 10;
    this.ctxOverlay.strokeStyle = options.stroke || "black";
    this.ctxOverlay.fillStyle = options.color || "white";
    this.ctxOverlay.font = `${options.size} ${options.font}`;
    this.ctxOverlay.textAlign = options.align || "center";
    this.ctxOverlay.strokeText(options.text, options.x, options.y);
    this.ctxOverlay.fillText(options.text, options.x, options.y);
  }

  clearOverlayText(){
    this.ctxOverlay.clearRect(0,0,this.canvas0.width,this.canvas0.height);
  }

  startScreen(){
    this.clearOverlayText();

    this.setOverlayText({
      size: "150px",
      stroke: "white",
      color: "orange",
      text: "Don't Miss!",
      x: this.canvas0.width/2,
      y: this.canvas0.height/4
    });

    this.setOverlayText({
      align: "left",
      size: "40px",
      text: "Click to shoot as many targets as you can",
      x: this.canvas0.width/6,
      y: this.canvas0.height/3+60
    });

    this.ctxOverlay.strokeText("before time runs out.", this.canvas0.width/6, this.canvas0.height/3+120);
    this.ctxOverlay.fillText("before time runs out.", this.canvas0.width/6, this.canvas0.height/3+120);

    this.setOverlayText({
      align: "left",
      stroke: "white",
      color: "green",
      text: "Click to Start",
      x: this.canvas0.width/3,
      y: this.canvas0.height/5*4
    });

    this.canvas0.addEventListener('click', prepInit);
    const game = this;
    function prepInit(){
      game.canvas0.removeEventListener('click', prepInit);
      game.init();
    }
  }


  gameOver(){
    clearInterval(this.interval);

    for (let i = 0; i < this.targets.length; i++){
      this.targets[i].state = 1;
    }

    this.clearOverlayText();
    this.setOverlayText({
      stroke: "white",
      color: "red",
      text: "Time's Up!",
      x: this.canvas0.width/2,
      y: this.canvas0.height/3
    });

    this.setOverlayText({
      size: "60px",
      text: `Your Score: ${this.score}`,
      x: this.canvas0.width/2,
      y: this.canvas0.height/2
    });

    this.setOverlayText({
      size: "60px",
      text: `Time Lasted: ${this.timeLasted/10}`,
      x: this.canvas0.width/2,
      y: this.canvas0.height/8*5
    });

    setTimeout( () => {
      this.setOverlayText({
        size: "60px",
        stroke: "white",
        color: "green",
        text: `Click to Play Again`,
        x: this.canvas0.width/2,
        y: this.canvas0.height/4*3
      });
      this.canvas0.addEventListener('click', prepInit);
      const game = this;
      function prepInit(){
        game.canvas0.removeEventListener('click', prepInit);
        game.init();
      }
    }, 2000);
  }

  action(event){
    const mousePos = this.getMousePos(event);
    let hitSuccess = false;
    for (let i = 0; i < this.targets.length; i++) {
      if (this.targets[i].hitTest(mousePos) && this.targets[i].state.mode==="spawn"){
        hitSuccess = true;
        this.targets[i].state=1;

        if (this.hitMultiplier < 5) {
          this.hitMultiplier++;
        }

        let pointValue;
        if (this.targets[i].y == 450) {
          pointValue = 1;
        } else if (this.targets[i].y == 400) {
          pointValue = 2;
        } else {
          pointValue = 3;
        }

        pointValue*=this.hitMultiplier;
        this.score+= pointValue;
        this.timer+= pointValue;
        this.timeLasted+= pointValue;
      }
    }
    
    if (!hitSuccess) {
      this.hitMultiplier = 1;
      this.timer -= 10;
      this.timeLasted -= 10;
    }
  }

  getMousePos(event){
    const rect = this.canvas0.getBoundingClientRect();
    const clientX = event.targetTouches ? event.targetTouches[0].pageX : event.clientX;
    const clientY = event.targetTouches ? event.targetTouches[0].pageY : event.clientY;

    const canvasScale = this.canvas0.width / this.canvas0.offsetWidth;
    const loc = {};

    loc.x = (clientX - rect.left) * canvasScale;
    loc.y = (clientY - rect.top) * canvasScale;
    return loc;
  }

  spawn(){
    let spawnPosX, direction;
    if (Math.random() < .5){
      spawnPosX = this.canvas0.width;
      direction = -1
    } else {
      spawnPosX = 0;
      direction = 1;
    }

    const rng = Math.random();
    let selectedLayer, selectedScale, spawnPosY;
    if (rng < .33){
      selectedLayer = this.ctx0;
      spawnPosY = 340;
      selectedScale = 0.55;
    } else if (rng < .66){
      selectedLayer = this.ctx1;
      spawnPosY = 400;
      selectedScale = 0.7;
    } else {
      selectedLayer = this.ctx2;
      spawnPosY = 450;
      selectedScale = .85;
    }

    let otherLayers = [this.foreground, this.water];
    if (spawnPosY == 400) {
      otherLayers.push(this.duck);
    } else if (spawnPosY == 340) {
      otherLayers.push(this.duck);
      otherLayers.push(this.grass);
    }

    const target = new Target({
      ctx: selectedLayer,
      x: spawnPosX,
      y: spawnPosY,
      direction: direction,
      width: this.targetImage.width,
      height: this.targetImage.height,
      image: this.targetImage,
      states: [
        {mode: "spawn", duration: 99},
        {mode: "despawn", duration: 1}
      ],
      scale: selectedScale,
      otherLayers: otherLayers,
    });

    this.targets.push(target);
    this.sinceLastSpawn = 0;
  }

  refresh(){
    const now = Date.now();
    const dt = (now - this.lastRefreshTime)/1000.0;

    this.update(dt);
    this.render();

    this.lastRefreshTime = now;

    const game = this;

    if (this.timer > 0 ) {
      requestAnimationFrame(function(){
        game.refresh();
      });
    } else {
      this.gameOver();
    }
  }

  update(dt){
    this.sinceLastSpawn += dt;
    if (this.sinceLastSpawn > Math.random()*5+0.4){
      this.spawn();
    }

    let removed;

    do{
      removed = false;
      for (let i = 0; i < this.targets.length; i++) {
        if (this.targets[i].despawn){
          if (this.targets[i].x < 0 || this.targets[i].x > 1280){
            this.hitMultiplier = 1;
            this.timer -= 10;
            this.timeLasted -= 10;
          }
          this.targets.splice(i,1);
          removed = true;
          break;
        }
      }
    }while (removed);

    for (let i = 0; i < this.targets.length; i++) {
      if (this.targets[i] == null) continue;
      this.targets[i].update(dt);
    }
  }

  render(){
    this.ctx0.clearRect(0, 0, this.canvas0.width, this.canvas0.width);
    this.ctx1.clearRect(0, 0, this.canvas0.width, this.canvas0.width);
    this.ctx2.clearRect(0, 0, this.canvas0.width, this.canvas0.width);
    this.clearOverlayText();

    for (let i = 0; i < this.targets.length; i++) {
      this.targets[i].render();
    }

    this.setOverlayText({
      align: "left",
      size: "60px",
      text: `score:  ${this.score}`,
      x: 40,
      y: 80
    });

    if (this.timer > 50){
      this.setOverlayText({
        text: `Time Left: ${parseInt(this.timer/10)}`,
        x: this.canvas0.width/2,
        y: this.canvas0.height/5
      });
    } else {
      this.setOverlayText({
        size: "150px",
        stroke: "red",
        text: this.timer/10,
        x: this.canvas0.width/2,
        y: this.canvas0.height/5
      });
    }
  }
}

module.exports = Game;
