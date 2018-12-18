const Target = require("./target");

class Game{
  constructor(layers){
    this.canvas0 = layers.interactiveLayer0;
    this.ctx0 = layers.interactiveLayer0.getContext("2d");
    this.canvas1 = layers.interactiveLayer1;
    this.ctx1 = layers.interactiveLayer1.getContext("2d");
    this.canvas2 = layers.interactiveLayer2;
    this.ctx2 = layers.interactiveLayer2.getContext("2d");
    this.overlayCanvas = layers.overlay;
    this.ctxOverlay = this.overlayCanvas.getContext("2d");

    this.targetImage = new Image();
    this.targetImage.src = "../assets/target.png";
    this.targets = [];

    const game = this;
    this.targetImage.onload = () => game.init();
  }

  init(){
    this.ctxOverlay.font = "150px impact";
    //this.canvas0.style.cursor = "url(../assets/crosshair2.png) 48 48, auto";
    this.score = 0;
    this.timer = 5;
    setInterval(()=>this.timer-=1, 1000);
    this.startTime = Date.now();
    this.lastRefreshTime = Date.now();
    this.spawn();
    this.refresh();

    const game = this;
    function action(event){
      game.action(event);
    }

    if ('ontouchstart' in window){
      this.canvas0.addEventListener('touchstart', action);
    } else {
      this.canvas0.addEventListener('mousedown', action);
    }
  }

  startScreen(){

  }

  start(){

  }

  action(event){
    const mousePos = this.getMousePos(event);

    for (let i = 0; i < this.targets.length; i++) {
      if (this.targets[i].hitTest(mousePos)){
        this.targets[i].despawn = true;
        this.score++;
        this.timer++;
      }
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
    console.log(`MousePos=${loc.x}, ${loc.y}`);
    return loc;
  }

  gameover(){
    clearInterval(this.timer);
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
      spawnPosY = 520;
      selectedScale = 0.6;
    } else if (rng < .66){
      selectedLayer = this.ctx1;
      spawnPosY = 600;
      selectedScale = 0.85;
    } else {
      selectedLayer = this.ctx2;
      spawnPosY = 700;
      selectedScale = 1;
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
        {mode: "spawn", duration: 0},
        {mode: "active", duration: 99},
        {mode: "despawn", duration: 5}
      ],
      scale: selectedScale,
    });

    this.targets.push(target);
    this.sinceLastSpawn = 0;
  }

  refresh(){
    if (this.timer <= 0){
      this.gameover();
    }
    const now = Date.now();
    const dt = (now - this.lastRefreshTime)/1000.0;

    this.update(dt);
    this.render();

    this.lastRefreshTime = now;

    const game = this;
    requestAnimationFrame(function(){
      game.refresh();
    });
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
    this.ctx0.clearRect(0, 0, this.canvas0.width, this.canvas0.width)
    this.ctx1.clearRect(0, 0, this.canvas0.width, this.canvas0.width)
    this.ctx2.clearRect(0, 0, this.canvas0.width, this.canvas0.width)
    this.ctxOverlay.clearRect(0,0,this.canvas0.width,this.canvas0.height)

    for (let i = 0; i < this.targets.length; i++) {
      this.targets[i].render();
    }

    this.ctxOverlay.fillText("Score: " + this.score, 50, 150);
  }
}

module.exports = Game;
