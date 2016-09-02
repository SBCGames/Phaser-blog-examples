var __extends = this.__extends || function (d, b) {
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
var State = (function (_super) {
    __extends(State, _super);
    function State() {
        _super.apply(this, arguments);
    }
    // -------------------------------------------------------------------------
    State.prototype.preload = function () {
        // background image
        this.game.load.image("BG", "bg.jpg");
        // load sprite images in atlas
        this.game.load.atlas("Atlas", "atlas.png", "atlas.json");
    };
    // -------------------------------------------------------------------------
    State.prototype.create = function () {
        // background
        this.add.image(0, 0, "BG");
        // set physiscs to P2 physics engin
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        // dron sprite
        var dron = new Dron(this.game, 320, 100, "Atlas", "dron1");
        // physics
        this.game.physics.enable(dron, Phaser.Physics.P2JS);
        dron.body.kinematic = true;
        // setup drton
        dron.setUp();
        // add dron to world group
        this.world.add(dron);
    };
    return State;
})(Phaser.State);
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
var Dron = (function (_super) {
    __extends(Dron, _super);
    function Dron() {
        _super.apply(this, arguments);
    }
    // -------------------------------------------------------------------------
    Dron.prototype.setUp = function () {
        this.anchor.setTo(0.5, 0.5);
        // random position
        this.reset(this.game.rnd.between(40, 600), this.game.rnd.between(60, 150));
        // random movement range
        var range = this.game.rnd.between(60, 120);
        // random duration of complete move
        var duration = this.game.rnd.between(30000, 50000);
        // random parameters for wiggle easing function
        var xPeriod1 = this.game.rnd.between(2, 13);
        var xPeriod2 = this.game.rnd.between(2, 13);
        var yPeriod1 = this.game.rnd.between(2, 13);
        var yPeriod2 = this.game.rnd.between(2, 13);
        // set tweens for horizontal and vertical movement
        var xTween = this.game.add.tween(this.body);
        xTween.to({ x: this.position.x + range }, duration, function (aProgress) {
            return wiggle(aProgress, xPeriod1, xPeriod2);
        }, true, 0, -1);
        var yTween = this.game.add.tween(this.body);
        yTween.to({ y: this.position.y + range }, duration, function (aProgress) {
            return wiggle(aProgress, yPeriod1, yPeriod2);
        }, true, 0, -1);
        // define animations
        this.animations.add("anim", ["dron1", "dron2"], this.game.rnd.between(2, 5), true);
        this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1, 6, "", 3));
        // play first animation as default
        this.play("anim");
    };
    // -------------------------------------------------------------------------
    Dron.prototype.explode = function () {
        // remove movement tweens
        this.game.tweens.removeFrom(this.body);
        // explode dron and kill it on complete
        this.play("explosion", 8, false, true);
    };
    return Dron;
})(Phaser.Sprite);
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
function wiggle(aProgress, aPeriod1, aPeriod2) {
    var current1 = aProgress * Math.PI * 2 * aPeriod1;
    var current2 = aProgress * Math.PI * 2 * aPeriod2;
    return Math.sin(current1) * Math.cos(current2);
}
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
window.onload = function () {
    new Game();
};
//# sourceMappingURL=app.js.map