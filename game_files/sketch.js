// variables
let terrain = []; 
let tileSize = 20;
let width, height;
let scale = 0.05;
let terrainSeed = 0;
let WIDTH, HEIGHT;



function setup() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  canvas = createCanvas(WIDTH, HEIGHT);
  // fetch seed from url
  let params = new URLSearchParams(window.location.search);
  terrainSeed = params.get('seed') ? parseInt(params.get('seed')) : Math.floor(Math.random() * 1000000);
  
  // set random and noise seeds
  randomSeed(terrainSeed);
  noiseSeed(terrainSeed);
  
  width = canvas.width / tileSize;
  height = canvas.height / tileSize;
  generateTerrain();
  frameRate(15);
}

function drawCharacter(x, y) {
  let s = tileSize;
  
  noStroke();
  
  // Head (skin tone)
  fill(255, 200, 150);
  rect(x + s, y, s, s);
  
  // Hair (brown)
  fill(139, 69, 19);
  rect(x + s * 0.5, y, s * 2, s * 0.5);
  rect(x + s * 0.5, y + s * 0.5, s, s * 0.5);
  rect(x + s * 1.5, y + s * 0.5, s, s * 0.5);
  
  // Body (orange shirt)
  fill(204, 85, 0);
  rect(x + s * 0.75, y + s, s * 2.5, s);
  
  // Left arm (skin)
  fill(255, 200, 150);
  rect(x + s * 0.25, y + s, s * 0.5, s);
  
  // Right arm (skin)
  fill(255, 200, 150);
  rect(x + s * 3.25, y + s, s * 0.5, s);
  
  // Backpack (blue)
  fill(0, 102, 204);
  rect(x + s * 2.5, y + s * 0.5, s, s * 1.5);
  
  // Pants (gray)
  fill(120, 120, 120);
  rect(x + s * 0.75, y + s * 2, s * 1.25, s);
  rect(x + s * 2, y + s * 2, s * 1.25, s);
  
  // Shoes (dark)
  fill(50, 50, 50);
  rect(x + s * 0.75, y + s * 3, s * 1.25, s * 0.5);
  rect(x + s * 2, y + s * 3, s * 1.25, s * 0.5);
}

function generateTerrain() {
  // Generate surface height using Perlin noise
  let surfaceHeight = new Array(width);
  for (let x = 0; x < width; x++) {
    surfaceHeight[x] = noise(x * scale * 0.5) * height * 0.2 + height * 0.4;
  }
  
  // Fill terrain grid
  for (let x = 0; x < width; x++) {
    terrain[x] = [];
    for (let y = 0; y < height; y++) {
      let tileY = surfaceHeight[x];
      
      if (y < tileY) {
        // Sky - no tile
        terrain[x][y] = 'air';
      } else if (y < tileY + 3) {
        // Grass/top soil layer (1-3 blocks)
        terrain[x][y] = 'grass';
      } else if (y < tileY + 15) {
        // Dirt layer
        terrain[x][y] = 'dirt';
      } else {
        // Stone and caves deeper down
        let caveNoise = noise(x * scale * 0.3, y * scale * 0.3, terrainSeed * 0.01);
        if (caveNoise > 0.55) {
          terrain[x][y] = 'air'; // Cave
        } else {
          terrain[x][y] = 'stone';
        }
      }
    }
  }
}

function draw() {
  background(135, 206, 235); // Sky blue background
  
  // Draw terrain
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (terrain[x] && terrain[x][y] !== 'air') {
        if (terrain[x][y] === 'grass') {
          fill(34, 139, 34); // Green grass
        } else if (terrain[x][y] === 'dirt') {
          fill(139, 90, 43); // Brown dirt
        } else if (terrain[x][y] === 'stone') {
          fill(80, 80, 80); // Gray stone
        }
        rect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  drawCharacter(width * tileSize / 2 - tileSize, height * tileSize / 2 - tileSize * 2);
}



function windowResized() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  resizeCanvas(WIDTH, HEIGHT);
  width = canvas.width / tileSize;
  height = canvas.height / tileSize;
}