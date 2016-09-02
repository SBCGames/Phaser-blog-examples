var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CustomFrames;
(function (CustomFrames) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        // -------------------------------------------------------------------------
        function Boot() {
            _super.call(this);
            this._easing1 = null;
            this._easing2 = null;
            this._easing3 = null;
            this._easing4 = null;
        }
        // -------------------------------------------------------------------------
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            // pause game when not focused
            this.stage.disableVisibilityChange = false;
            var screenDims = Utils.ScreenUtils.screenMetrics;
            if (this.game.device.desktop) {
                console.log("DESKTOP");
                this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
                //this.scale.setMinMax(800, 500, 800, 500);
                this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
                //this.scale.setUserScale(1, 1);
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
            }
            else {
                console.log("MOBILE");
                this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
                //this.scale.setMinMax(640, 400, 1280, 800);
                this.scale.setUserScale(screenDims.scaleX, screenDims.scaleY);
                this.scale.pageAlignHorizontally = true;
                this.scale.pageAlignVertically = true;
                this.scale.forceOrientation(true, false);
                this.scale.setResizeCallback(this.gameResized, this);
                this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
                this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            }
        };
        // -------------------------------------------------------------------------
        Boot.prototype.preload = function () {
            // load assets for preloader
            this.load.image("bg", "assets/bg.png");
            this.load.image("ball", "assets/ball.png");
        };
        // -------------------------------------------------------------------------
        Boot.prototype.create = function () {
            this.stage.backgroundColor = 0x8CCFFF;
            // chart axis
            var bg = this.add.image(this.world.centerX, this.world.centerY, "bg");
            bg.anchor.setTo(0.5, 0.5);
            // ball sprite
            var ballX = 105;
            var ballY = 278;
            var ball = this.add.sprite(ballX, ballY, "ball");
            ball.anchor.setTo(0, 1);
            // debug text
            var style = { font: "16px Arial", fill: "#000000", align: "left" };
            var text = this.game.add.text(10, 10, "Press 1, 2, 3 or 4", style);
            var info = this.game.add.text(10, 30, "", style);
            // initialize easing functions
            this._easing1 = new Utils.GravityBounce(3);
            this._easing2 = new Utils.GravityBounce(3, -1, false);
            this._easing3 = new Utils.GravityBounce(-1, 0.5);
            this._easing4 = new Utils.GravityBounce(4, 1.1);
            // context
            var self = this;
            // move tween
            var moveTween1 = this.game.add.tween(ball);
            moveTween1.to({ x: ballX + 150 }, 1500, Phaser.Easing.Linear.None);
            var moveTween2 = this.game.add.tween(ball);
            moveTween2.to({ x: ballX + 200 }, 2500, Phaser.Easing.Linear.None);
            // bounce easing tweens
            // bounce tween 1
            var bounceTween1 = this.game.add.tween(ball);
            bounceTween1.to({ y: ballY - 150 }, 1500, function (k) {
                return self._easing1.easing(k);
            });
            // bounce tween 2
            var bounceTween2 = this.game.add.tween(ball);
            bounceTween2.to({ y: ballY - 150 }, 1500, function (k) {
                return self._easing2.easing(k);
            });
            // bounce tween 3
            var bounceTween3 = this.game.add.tween(ball);
            bounceTween3.to({ y: ballY - 150 }, 2500, function (k) {
                return self._easing3.easing(k);
            });
            // bounce tween 4
            var bounceTween4 = this.game.add.tween(ball);
            bounceTween4.to({ y: ballY - 150 }, 2500, function (k) {
                return self._easing4.easing(k);
            });
            // switching tweens
            this.input.keyboard.addCallbacks(this, null, null, function (aChar) {
                if (moveTween1.isRunning || moveTween2.isRunning) {
                    return;
                }
                // reset ball position
                ball.position.setTo(ballX, ballY);
                if (aChar === "1") {
                    moveTween1.start();
                    bounceTween1.start();
                    info.setText("3 jumps, unknown elasticity (-1), start from top");
                }
                else if (aChar == "2") {
                    moveTween1.start();
                    bounceTween2.start();
                    info.setText("3 jumps, unknown elasticity (-1), start from bottom");
                }
                else if (aChar === "3") {
                    moveTween2.start();
                    bounceTween3.start();
                    info.setText("unknown number of jumps (-1), elasticity 0.5, start from top");
                }
                else if (aChar == "4") {
                    moveTween2.start();
                    bounceTween4.start();
                    info.setText("4 jumps, elasticity 1.1, start from top");
                }
            });
        };
        // -------------------------------------------------------------------------
        Boot.prototype.gameResized = function () {
            console.log("resized");
        };
        // -------------------------------------------------------------------------
        Boot.prototype.enterIncorrectOrientation = function () {
            console.log("incorrect orientation");
            CustomFrames.Globals.correctOrientation = false;
            document.getElementById("orientation").style.display = "block";
        };
        // -------------------------------------------------------------------------
        Boot.prototype.leaveIncorrectOrientation = function () {
            console.log("correct orientation");
            CustomFrames.Globals.correctOrientation = true;
            document.getElementById("orientation").style.display = "none";
        };
        return Boot;
    })(Phaser.State);
    CustomFrames.Boot = Boot;
})(CustomFrames || (CustomFrames = {}));
//# sourceMappingURL=boot.js.map