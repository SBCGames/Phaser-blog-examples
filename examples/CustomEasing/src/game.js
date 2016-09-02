var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CustomFrames;
(function (CustomFrames) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // -------------------------------------------------------------------------
        function Game() {
            // calculate screen dimensions
            var screenDims = Utils.ScreenUtils.calculateScreenMetrics(500, 313, 1 /* LANDSCAPE */, 500, 313);
            _super.call(this, screenDims.gameWidth, screenDims.gameHeight, Phaser.CANVAS, "content", null);
            // states
            this.state.add('Boot', CustomFrames.Boot);
            // start
            this.state.start('Boot');
        }
        // -------------------------------------------------------------------------
        Game.prototype.additionalFrameProperties = function (aFrame, aData) {
            // anchor
            if (aData.anchor) {
                aFrame["anchorX"] = aData.anchor.w;
                aFrame["anchorY"] = aData.anchor.h;
            }
            // next tem
            if (aData.nextitem) {
                aFrame["nextItemX"] = aData.nextitem.w;
                aFrame["nextItemY"] = aData.nextitem.h;
            }
        };
        return Game;
    })(Phaser.Game);
    CustomFrames.Game = Game;
})(CustomFrames || (CustomFrames = {}));
//# sourceMappingURL=game.js.map