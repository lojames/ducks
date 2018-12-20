const Target = require("./target");

const gameLength = 15;

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
    this.ctxOverlay.lineWidth = 10;

    this.targetImage = new Image();
    this.targetImage.src = "../assets/target.png";
    this.targets = [];


    const game = this;
    document.fonts.ready.then(() => {this.startScreen()});
  }

  init(){
    this.canvas0.style.cursor = "url(../assets/crosshair2.png) 23 23, auto";
    console.log(gameLength);
    this.score = 0;
    this.timer = gameLength*10;
    console.log(this.timer);
    this.timeLasted = this.timer;
    this.interval = setInterval(()=>this.timer-=1, 100);
    this.startTime = Date.now();
    this.lastRefreshTime = Date.now();
    this.spawn();
    this.refresh();

    const game = this;
    function action(event){
      game.action(event);
    }

    this.canvas0.addEventListener('click', action);
    // if ('ontouchstart' in window){
    //   this.canvas0.addEventListener('touchstart', action);
    // } else {
    //   this.canvas0.addEventListener('mousedown', action);
    // }
  }

  startScreen(){
    this.ctxOverlay.clearRect(0,0,this.canvas0.width,this.canvas0.height);
    this.ctxOverlay.strokeStyle = 'white';
    this.ctxOverlay.fillStyle = 'orange';
    this.ctxOverlay.font = "100px 'Luckiest Guy'";
    this.ctxOverlay.textAlign = "center";
    this.ctxOverlay.strokeText("Don't Shoot the Ducks!", this.canvas0.width/2, this.canvas0.height/4);
    this.ctxOverlay.fillText("Don't Shoot the Ducks!", this.canvas0.width/2, this.canvas0.height/4);

    this.ctxOverlay.strokeStyle = 'black';
    this.ctxOverlay.fillStyle = 'white';
    this.ctxOverlay.font = "40px 'Luckiest Guy'";
    this.ctxOverlay.textAlign = "left";
    this.ctxOverlay.strokeText("Click to shoot as many targets as you can", this.canvas0.width/6, this.canvas0.height/3+60);
    this.ctxOverlay.fillText("Click to shoot as many targets as you can", this.canvas0.width/6, this.canvas0.height/3+60);

    this.ctxOverlay.strokeText("before time runs out.", this.canvas0.width/6, this.canvas0.height/3+120);
    this.ctxOverlay.fillText("before time runs out.", this.canvas0.width/6, this.canvas0.height/3+120);

    this.ctxOverlay.strokeStyle = 'white';
    this.ctxOverlay.fillStyle = 'green';
    this.ctxOverlay.font = "100px 'Luckiest Guy'";
    this.ctxOverlay.strokeText("Click to Start", this.canvas0.width/3, this.canvas0.height/5*4);
    this.ctxOverlay.fillText("Click to Start", this.canvas0.width/3, this.canvas0.height/5*4);
    this.canvas0.addEventListener('click', prepInit);
    const game = this;
    function prepInit(){
      game.canvas0.removeEventListener('click', prepInit);
      game.init();
    }
  }


  gameOver(){
    clearInterval(this.interval);
    this.ctxOverlay.clearRect(0,0,this.canvas0.width,this.canvas0.height)
    this.ctxOverlay.strokeStyle = 'white';
    this.ctxOverlay.fillStyle = 'red';
    this.ctxOverlay.font = "100px 'Luckiest Guy'";
    this.ctxOverlay.textAlign = "center";
    this.ctxOverlay.strokeText("Time's Up!", this.canvas0.width/2, this.canvas0.height/3);
    this.ctxOverlay.fillText("Time's Up!", this.canvas0.width/2, this.canvas0.height/3);

    this.ctxOverlay.strokeStyle = 'black';
    this.ctxOverlay.fillStyle = 'white';
    this.ctxOverlay.font = "60px 'Luckiest Guy'";
    this.ctxOverlay.strokeText(`Your Score: ${this.score}`, this.canvas0.width/2, this.canvas0.height/8*4);
    this.ctxOverlay.fillText(`Your Score: ${this.score}`, this.canvas0.width/2, this.canvas0.height/8*4);
    this.ctxOverlay.strokeText(`Time Lasted: ${this.timeLasted/10}`, this.canvas0.width/2, this.canvas0.height/8*5);
    this.ctxOverlay.fillText(`Time Lasted: ${this.timeLasted/10}`, this.canvas0.width/2, this.canvas0.height/8*5);

    this.ctxOverlay.strokeStyle = 'white';
    this.ctxOverlay.fillStyle = 'green';
    this.ctxOverlay.font = "60px 'Luckiest Guy'";
    this.ctxOverlay.textAlign = "center";
    setTimeout( () => {
      this.ctxOverlay.strokeText("Click to Try Again", this.canvas0.width/2, this.canvas0.height/4*3);
      this.ctxOverlay.fillText("Click to Try Again", this.canvas0.width/2, this.canvas0.height/4*3);
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

    for (let i = 0; i < this.targets.length; i++) {
      if (this.targets[i].hitTest(mousePos) && this.targets[i].state.mode==="spawn"){
        this.targets[i].state=1;
        console.log(this.targets[i].state);
        this.score++;
        this.timer+=5;
        this.timeLasted+=5;
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
    console.log("target spawn");
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

    this.ctxOverlay.textAlign = "left";
    this.ctxOverlay.strokeStyle = 'black';
    this.ctxOverlay.fillStyle = 'white';
    this.ctxOverlay.font = "60px 'Luckiest Guy'";
    this.ctxOverlay.strokeText("score:  " + this.score, 40, 80);
    this.ctxOverlay.fillText("score:  " + this.score, 40, 80);

    this.ctxOverlay.textAlign = "center";
    if (this.timer > 50){
      this.ctxOverlay.strokeStyle = 'black';
      this.ctxOverlay.fillStyle = 'white';
      this.ctxOverlay.font = "80px 'Luckiest Guy'";
      this.ctxOverlay.strokeText(`Time Left: ${parseInt(this.timer/10)}`, this.canvas0.width/2, this.canvas0.height/5);
      this.ctxOverlay.fillText(`Time Left: ${parseInt(this.timer/10)}`, this.canvas0.width/2, this.canvas0.height/5);
    } else {
      this.ctxOverlay.strokeStyle = 'red';
      this.ctxOverlay.fillStyle = 'white';
      this.ctxOverlay.font = "150px 'Luckiest Guy'";
      this.ctxOverlay.strokeText(this.timer/10, this.canvas0.width/2, this.canvas0.height/4);
      this.ctxOverlay.fillText(this.timer/10, this.canvas0.width/2, this.canvas0.height/4);
    }
  }
}

module.exports = Game;
