var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wrap = (function (_super) {
    __extends(Wrap, _super);
    // -------------------------------------------------------------------------
    function Wrap() {
        _super.call(this);
    }
    // -------------------------------------------------------------------------
    Wrap.prototype.preload = function () {
        // bg
        this.load.image('BG', 'assets/bg.jpg');

        // font
        this.load.bitmapFont('Font', 'assets/font.png', 'assets/font.xml');

        // sprites
        this.load.atlas('Sprites', 'assets/sprites.png', 'assets/sprites.json');
    };

    // -------------------------------------------------------------------------
    Wrap.prototype.create = function () {
        // bg
        this.add.image(0, 0, 'BG');

        // text area 520 x 260, offset 60 x 30
        var text = 'WRAPPED BITMAP TEXT\n' + '-------------------------------------------\n\n' + ' This example demonstrates TextWrapper helper class for Phaser game engine, that allows you to easily wrap bitmap text.\n' + ' Not only it can wrap long paragraphs into lines but it also splits whole text into multiple pages - ' + 'touch buttons bellow to go to next or previous page.\n' + ' The TextWrapper preserves all original new line characters and ads others, that are necessary to wrap text correctly. ' + 'After calling wrapText() method string array is returned where each array element is single text page with all necessary new line characters.\n\n' + ' By the way, if you like background image it is from our game Shards - the brickbreaker. ' + 'It is available for Android as well as for iOS. Give it a try! Not a bad way how to create long text and make publicity to our game at once :-)';
        var pages = Helper.TextWrapper.wrapText(text, 520, 260, 'Font', 25);
        var currentPage = 0;
        var bitmapText = this.add.bitmapText(60, 30, 'Font', pages[currentPage], 25);

        // text to show pages
        var pagesText = this.add.bitmapText(320, 320, 'Font', (currentPage + 1) + '/' + pages.length);
        pagesText.x -= pagesText.width / 2;
        pagesText.updateText();

        // buttons
        var buttonRight = this.add.button(570, 360, 'Sprites', function () {
            currentPage = Math.min(currentPage + 1, pages.length - 1);
            if (currentPage === pages.length - 1)
                buttonRight.visible = false;
            buttonLeft.visible = true;
            pagesText.setText((currentPage + 1) + '/' + pages.length);

            bitmapText.setText(pages[currentPage]);
            bitmapText.updateText();
        }, this, 'Right', 'Right', 'Right', 'Right');
        buttonRight.anchor.setTo(1, 1);

        var buttonLeft = this.add.button(70, 360, 'Sprites', function () {
            currentPage = Math.max(currentPage - 1, 0);
            if (currentPage === 0)
                buttonLeft.visible = false;
            buttonRight.visible = true;
            pagesText.setText((currentPage + 1) + '/' + pages.length);

            bitmapText.setText(pages[currentPage]);
            bitmapText.updateText();
        }, this, 'Left', 'Left', 'Left', 'Left');
        buttonLeft.anchor.setTo(0, 1);
        buttonLeft.visible = false;
    };
    return Wrap;
})(Phaser.State);

var MyGame = (function (_super) {
    __extends(MyGame, _super);
    // -------------------------------------------------------------------------
    function MyGame() {
        _super.call(this, 640, 400, Phaser.AUTO, 'content', null);

        // add states
        this.state.add('Wrap', Wrap);

        // start
        this.state.start('Wrap');
    }
    return MyGame;
})(Phaser.Game);

// -------------------------------------------------------------------------
window.onload = function () {
    new MyGame();
};
//# sourceMappingURL=app.js.map
