const Game = require("./game");

document.addEventListener("DOMContentLoaded", () => {
  const layers = {
    interactiveLayer0: document.getElementById("interactive-grass-layer"),
    interactiveLayer1: document.getElementById("interactive-duck-layer"),
    interactiveLayer2: document.getElementById("interactive-water-layer"),
    grassLayer: document.getElementById("grass-layer"),
    duckLayer: document.getElementById("duck-layer"),
    waterLayer: document.getElementById("water-layer"),
    foregroundLayer: document.getElementById("foreground-layer"),
    overlay: document.getElementById("overlay-layer"),
  }

  layers.interactiveLayer0.width = 1920;
  layers.interactiveLayer0.height = 1080;
  layers.interactiveLayer1.width = 1920;
  layers.interactiveLayer1.height = 1080;
  layers.interactiveLayer2.width = 1920;
  layers.interactiveLayer2.height = 1080;
  layers.overlay.width = 1920;
  layers.overlay.height = 1080;

  const game = new Game(layers);
});
