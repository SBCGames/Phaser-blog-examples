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
        this._cannonTip = new Phaser.Point();
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
        // allow inpact events
        this.game.physics.p2.setImpactEvents(true);
        // cannon - place it in the bottom center
        this._cannon = this.game.add.sprite(this.world.centerX, this.world.height, "Atlas", "cannon");
        // offset it from position
        this._cannon.anchor.setTo(-0.75, 0.5);
        // make it point straight up
        this._cannon.rotation = -Math.PI / 2;
        // cannon base - place over cannon, so it overlaps it
        var base = this.game.add.sprite(this.world.centerX, this.world.height, "Atlas", "base");
        base.anchor.setTo(0.5, 1);
        //  collision groups for drones
        this._dronesCollisionGroup = this.game.physics.p2.createCollisionGroup();
        //  collision groups for missiles
        this._missilesCollisionGroup = this.physics.p2.createCollisionGroup();
        // drones group
        this._drones = this.add.group();
        this._drones.physicsBodyType = Phaser.Physics.P2JS;
        this._drones.enableBody = true;
        // create 8 drones
        this._drones.classType = Dron;
        this._drones.createMultiple(8, "Atlas", "dron1");
        this._drones.forEach(function (aDron) {
            // setup movements and animations
            aDron.setUp();
            // setup physics
            var body = aDron.body;
            body.setCircle(aDron.width / 2);
            body.kinematic = true; // does not respond to forces
            body.setCollisionGroup(this._dronesCollisionGroup);
            // adds group drones will collide with and callback
            body.collides(this._missilesCollisionGroup, this.hitDron, this);
            //body.debug = true;
        }, this);
        // missiles group
        this._missiles = this.add.group();
        this._missiles.physicsBodyType = Phaser.Physics.P2JS;
        this._missiles.enableBody = true;
        // create 10 missiles
        this._missiles.createMultiple(10, "Atlas", "missile");
        this._missiles.forEach(function (aMissile) {
            aMissile.anchor.setTo(0.5, 0.5);
            // physics
            var body = aMissile.body;
            body.setRectangle(aMissile.width, aMissile.height);
            body.setCollisionGroup(this._missilesCollisionGroup);
            body.collides(this._dronesCollisionGroup);
            // body.debug = true;
        }, this);
        //  Game input
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this._space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // following keys will not be propagated to browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
    };
    // -------------------------------------------------------------------------
    State.prototype.update = function () {
        // shortcut
        var keyboard = this.game.input.keyboard;
        // left and right key
        if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
            // calculate frame independent speed - 45 degrees (PI/4) in 1 second adjusted with cannon speed
            this._cannon.rotation -= this.time.elapsedMS * State.CANNON_SPEED / 1000 * (Math.PI / 4);
        }
        else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this._cannon.rotation += this.time.elapsedMS * State.CANNON_SPEED / 1000 * (Math.PI / 4);
        }
        else if (this._space.justDown) {
            // get firtst missile from pool
            var missile = this._missiles.getFirstExists(false);
            if (missile) {
                // calculate position of cannon tip. Put distance from cannon base along x axis and rotate it to cannon angle
                this._cannonTip.setTo(this._cannon.width * 2, 0);
                this._cannonTip.rotate(0, 0, this._cannon.rotation);
                missile.reset(this._cannon.x + this._cannonTip.x, this._cannon.y + this._cannonTip.y);
                missile.body.rotation = this._cannon.rotation;
                // life of missile in millis
                missile.lifespan = 1500;
                // set velocity of missile in direction of cannon barrel
                missile.body.velocity.x = this._cannonTip.x * State.MISSILE_SPEED;
                missile.body.velocity.y = this._cannonTip.y * State.MISSILE_SPEED;
            }
        }
        // limit cannon rotation to left and right to +/- 45 degrees ... -135 to -45 degrees here
        this._cannon.rotation = Phaser.Math.clamp(this._cannon.rotation, -1.5 * Math.PI / 2, -0.5 * Math.PI / 2);
    };
    // -------------------------------------------------------------------------
    State.prototype.render = function () {
        // uncomment to visual debug, also uncommnet "body.debug = true;" when creating missiles and drones
        /*
        this._drons.forEach(function (aDron: Dron) {
            this.game.debug.body(aDron);
        }, this);

        this._missiles.forEach(function (aMissile: Phaser.Sprite) {
            this.game.debug.body(aMissile);
        }, this);
        */
    };
    // -------------------------------------------------------------------------
    State.prototype.hitDron = function (aObject1, aObject2) {
        // explode dron and remove missile - kill it, not destroy
        aObject1.sprite.explode();
        aObject2.sprite.kill();
    };
    State.CANNON_SPEED = 2;
    State.MISSILE_SPEED = 6;
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
        var xPeriod1 = Dron.primes[this.game.rnd.between(0, Dron.primes.length - 1)];
        var xPeriod2 = Dron.primes[this.game.rnd.between(0, Dron.primes.length - 1)];
        var yPeriod1 = Dron.primes[this.game.rnd.between(0, Dron.primes.length - 1)];
        var yPeriod2 = Dron.primes[this.game.rnd.between(0, Dron.primes.length - 1)];
        // set tweens for horizontal and vertical movement
        this._xTween = this.game.add.tween(this.body);
        this._xTween.to({ x: this.position.x + range }, duration, function (aProgress) {
            return wiggle(aProgress, xPeriod1, xPeriod2);
        }, true, 0, -1);
        this._yTween = this.game.add.tween(this.body);
        this._yTween.to({ y: this.position.y + range }, duration, function (aProgress) {
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
    // primes work best with wiggle easing function
    Dron.primes = [3, 5, 7, 11, 13];
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