class FloatText{
  constructor(options){
    this.context = options.context;
    this.in_length = (options.in_length == null) ? 1 : options.in_length;
    this.hold_length = (options.hold_length == null) ? 1 : options.hold_length;
    this.out = (options.out_length == null) ? 1 : options.out_length;
    this.x = (options.x == null) ? 640 : options.x;
    this.y = (options.y == null) ? 360 : options.y;
    this.states = options.states;
    this.state = 0;
    this.currentTime = 0;
    this.distance = 5;
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

  update(dt){


  render(){

  }

}
