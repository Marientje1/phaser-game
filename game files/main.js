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
    // Laad assets (voeg je eigen afbeeldingen toe aan assets/ map)
    this.load.image('tiles', 'assets/tiles.png'); // Voorbeeld: spritesheet met tegels
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 }); // Speler sprite
    // Als je geen assets hebt, gebruik Phaser's ingebouwde graphics voor prototyping
}

function create() {
    // Maak een eenvoudige tilemap (statisch voor nu; later procedurally genereren)
    map = this.make.tilemap({ data: createWorldData(), tileWidth: 32, tileHeight: 32 });
    tileset = map.addTilesetImage('tiles');
    layer = map.createLayer(0, tileset, 0, 0);

    // Stel botsingen in voor bepaalde tegels (bijv. aarde)
    layer.setCollision([1, 2]); // Pas aan op basis van je tileset

    // Maak speler
    player = this.physics.add.sprite(100, 100, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, layer);

    // Camera volgt speler
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Controls
    cursors = this.input.keyboard.createCursorKeys();

    // Animaties voor speler (optioneel)
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [{ key: 'player', frame: 4 }],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
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
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1,1],
        [2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2],
        [2,2,2,2,2,2,2,2,2,2]
    ];
}