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

  layers.interactiveLayer0.width = 1280;
  layers.interactiveLayer0.height = 720;
  layers.interactiveLayer1.width = 1280;
  layers.interactiveLayer1.height = 720;
  layers.interactiveLayer2.width = 1280;
  layers.interactiveLayer2.height = 720;
  layers.overlay.width = 1280;
  layers.overlay.height = 720;

  layers.grassLayer.width = 1280;
  layers.grassLayer.height = 720;
  layers.duckLayer.width = 1280;
  layers.duckLayer.height = 720;
  layers.waterLayer.width = 1280;
  layers.waterLayer.height = 720;
  layers.foregroundLayer.width = 1280;
  layers.foregroundLayer.height = 720;

  const game = new Game(layers);
});
