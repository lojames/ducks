class Target{
  constructor(options){
    this.ctx = options.ctx;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
    this.x = options.x;
    this.y = options.y;
    this.anchor = (options.anchor == null) ? {x:0.5, y:0.5} : options.anchor;
    this.states = options.states;
    this.state = 0;
    this.scale = (options.scale == null) ? 1.0 : options.scale;
    this.opacity = (options.opacity == null ) ? 1.0 : options.opacity;
    this.currentTime = 0;
    this.despawn = false;
    this.direction = options.direction;
    this.speed = Math.random()*4+2;
  }

  set state(index){
    this.stateIndex = index;
    this.stateTime = 0;
  }

  get state(){
    let result;
    if (this.stateIndex<this.states.length){
      result = this.states[this.stateIndex];
    }
    return result;
  }

  hitTest(pos){
    const center = { x: this.x, y: this.y };
    const radius = (this.width * this.scale) / 2.0;
    console.log(`Center: ${center.x}, ${center.y}`);
    console.log(`Radius: ${radius}`);
    const dist = distanceBetweenPoints(pos, center);

    return (dist < radius)

    function distanceBetweenPoints(a,b){
      var x = a.x - b.x;
      var y = a.y - b.y;

      return Math.sqrt(x*x + y*y);
    }
  }

  update(dt){
    this.stateTime += dt;
    const state = this.state;
    if (state == null || this.x < 0 || this.x > 1280){
      this.despawn = true;
      return;
    }

    const delta = this.stateTime/state.duration;
    if (delta > 1) {
      this.state = this.stateIndex + 1;
    }

    switch(state.mode){
      case "spawn":
        break;
      case "active":
        this.x += (this.direction*this.speed);
        break;
      case "despawn":
        this.y += 4.0;
        this.opacity = .85
    }
  }

  render(){
    const alpha = this.ctx.globalAlpha;

    this.ctx.globalAlpha = this.opacity;
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.width,
      this.height,
      this.x - this.width * this.scale * this.anchor.x,
      this.y - this.height * this.scale * this.anchor.y,
      this.width * this.scale,
      this.height * this.scale,
    );
    this.ctx.globalAlpha = alpha;
  }
}


module.exports = Target;
