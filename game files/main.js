var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var player;
var cursors;
var map;
var tileset;
var layer;

function preload() {
    // Creëer eenvoudige textures voor tegels en speler (geen externe assets nodig)
    // Tegels: groen voor gras, bruin voor aarde
    let tileGraphics = this.add.graphics();
    tileGraphics.fillStyle(0x00ff00); // Gras
    tileGraphics.fillRect(0, 0, 32, 32);
    tileGraphics.fillStyle(0x8B4513); // Aarde
    tileGraphics.fillRect(32, 0, 32, 32);
    tileGraphics.generateTexture('tiles', 64, 32);

    // Speler: blauw vierkant
    let playerGraphics = this.add.graphics();
    playerGraphics.fillStyle(0x0000ff);
    playerGraphics.fillRect(0, 0, 32, 32);
    playerGraphics.generateTexture('player', 32, 32);
}

function create() {
    // Maak een eenvoudige tilemap (statisch voor nu; later procedurally genereren)
    map = this.make.tilemap({ data: createWorldData(), tileWidth: 32, tileHeight: 32 });
    tileset = map.addTilesetImage('tiles');
    layer = map.createLayer(0, tileset, 0, 0);

    // Stel botsingen in voor bepaalde tegels (bijv. aarde)
    layer.setCollision([1, 2]); // Pas aan op basis van je tileset

    // Maak speler (eenvoudig zonder animaties)
    player = this.physics.add.sprite(100, 100, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, layer);

    // Camera volgt speler
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Controls
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Speler beweging
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

// Eenvoudige wereld data (10x10 tegels; 0 = lucht, 1 = gras, 2 = aarde)
function createWorldData() {
    return [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0
        [2,2,2,2,2,2,2,2,2,2]
    ];
}