var CustomFrames;
(function (CustomFrames) {
    var Globals = (function () {
        function Globals() {
        }
        // game derived from Phaser.Game
        Globals.game = null;
        // game orientation
        Globals.correctOrientation = false;
        return Globals;
    })();
    CustomFrames.Globals = Globals;
})(CustomFrames || (CustomFrames = {}));
// -------------------------------------------------------------------------
window.onload = function () {
    CustomFrames.Globals.game = new CustomFrames.Game();
};
//# sourceMappingURL=app.js.map