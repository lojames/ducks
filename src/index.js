const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  const layers = {
    interactiveLayer0: document.getElementById("interactive-grass-layer"),
    interactiveLayer1: document.getElementById("interactive-duck-layer"),
    interactiveLayer2: document.getElementById("interactive-water-layer"),
    backgroundLayer: document.getElementById("background-layer"),
    grassLayer: document.getElementById("grass-layer"),
    duckLayer: document.getElementById("duck-layer"),
    waterLayer: document.getElementById("water-layer"),
    foregroundLayer: document.getElementById("foreground-layer"),
    floatTextLayer: document.getElementById("float-text-layer"),
    overlay: document.getElementById("overlay-layer"),
  }

  for (const layer in layers){
    layers[layer].width = 1280;
    layers[layer].height = 720;
  }

  const game = new Game(layers);
});
