var game = new Phaser.Game(640, 400, Phaser.AUTO, 'content', { preload: preload, create: create });

function preload() {
    game.load.image('bg', 'bg1.jpg');
    game.load.image('9image', '9TextBox.png');
}

function create() {

    // bg image
    game.add.sprite(0, 0, 'bg');

    // 9-image
    var sprite = new Phaser.NineImage(this.game, 20, 20, 250, 180, "9image", 0, 17, 8, 30, 25, false);
    this.world.add(sprite);
    
    // 9- image
    sprite = new Phaser.NineImage(this.game, 300, 20, 100, 180, "9image", 0, 17, 8, 30, 25, false);
    this.world.add(sprite);

    // 9- image
    sprite = new Phaser.NineImage(this.game, 20, 250, 8, 1, "9image", 0, 17, 8, 30, 25, true);
    this.world.add(sprite);
}
