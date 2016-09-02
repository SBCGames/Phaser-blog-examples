var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
var Game = (function (_super) {
    __extends(Game, _super);
    // -------------------------------------------------------------------------
    function Game() {
        // init game
        _super.call(this, 640, 400, Phaser.CANVAS, "content", State);
    }
    return Game;
})(Phaser.Game);
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
var MySprite = (function (_super) {
    __extends(MySprite, _super);
    // -------------------------------------------------------------------------
    function MySprite(aGame, aX, aY, aKey, aParentTransform) {
        _super.call(this, aGame, aX, aY, aKey);
        this._parentTransform = aParentTransform;
    }
    // -------------------------------------------------------------------------
    MySprite.prototype.updateTransform = function () {
        if (!this.visible) {
            return;
        }
        this.displayObjectUpdateTransform(this._parentTransform);
    };
    return MySprite;
})(Phaser.Sprite);
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
var State = (function (_super) {
    __extends(State, _super);
    function State() {
        _super.apply(this, arguments);
    }
    // -------------------------------------------------------------------------
    State.prototype.preload = function () {
        // sprites
        this.load.image("Wall", "assets/Wall.png");
        this.load.image("Gem0", "assets/Gem0.png");
        this.load.image("Gem1", "assets/Gem1.png");
        this.load.image("Gem2", "assets/Gem2.png");
        this.load.image("Gem3", "assets/Gem3.png");
    };
    // -------------------------------------------------------------------------
    State.prototype.create = function () {
        this.stage.backgroundColor = 0x0F3043;
        var group1 = this.add.group();
        var group2 = this.add.group();
        var spritesGroup = this.add.group();
        for (var i = 0; i < 4; i++) {
            // wall sprite
            var wall = new MySprite(this.game, 50, 90 + i * 70, "Wall", group1);
            wall.width = 440;
            wall.z = i * 2;
            spritesGroup.add(wall);
            // gem sprite
            var gem = new MySprite(this.game, 170 + 100 * i, 50, "Gem" + i, group2);
            gem.anchor.setTo(0.5, 0.5);
            gem.z = i * 2 + 1;
            spritesGroup.add(gem);
        }
        // move groups
        this.add.tween(group1).to({ x: 100 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, -1, true);
        this.add.tween(group2).to({ y: 320 }, 3000, Phaser.Easing.Linear.None, true, 0, -1, true);
    };
    return State;
})(Phaser.State);
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
window.onload = function () {
    new Game();
};
//# sourceMappingURL=testbed.js.map