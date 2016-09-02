Phaser.NineImage = function (game, x, y, width, height, key, frame, top, left, bottom, right, repeats) {

    x |= 0;
    y |= 0;
    width |= 0;
    height |= 0;
    top |= 0;
    left |= 0;
    bottom |= 0;
    right |= 0;

    PIXI.Sprite.call(this, PIXI.TextureCache['__default']);

    Phaser.Component.Core.init.call(this, game, x, y, null, null);


    // image
    this.nineImage = this.game.cache.getImage(key);

    // get frame
    if (typeof frame === "string") {
        this.nineImageFrame = this.game.cache.getFrameByName(key, frame);
    } else {
        this.nineImageFrame = this.game.cache.getFrameByIndex(key, frame);
    }

    // calculate all necessary metrics to render nine image
    this.calculateNineImage(width, height, top, left, bottom, right, repeats);


    // The canvas to which this NineImage draws.
    this.canvas = Phaser.Canvas.create(this.nineImageWidth, this.nineImageHeight);
    // The 2d context of the canvas.
    this.context = this.canvas.getContext('2d');
    // Required Pixi var.
    this.baseTexture = new PIXI.BaseTexture(this.canvas);
    // Required Pixi var.
    this.texture = new PIXI.Texture(this.baseTexture);

    // Dimensions of the renderable area.
    this.textureFrame = new Phaser.Frame(0, 0, 0, this.nineImageWidth, this.nineImageHeight, 'nineimage', game.rnd.uuid());
    // The const type of this object.
    this.type = Phaser.NineImage;
    // The const physics body type of this object.
    this.physicsType = Phaser.NineImage;

    // Settings that control standard (non-diagnostic) rendering.
    this.renderSettings = {
        overdrawRatio: 0.20,
        copyCanvas: null
    };

    // Controls if the core game loop and physics update this game object or not.
    this.exists = true;

    if (!game.device.canvasBitBltShift)
    {
        this.renderSettings.copyCanvas = Phaser.NineImage.ensureSharedCopyCanvas();
    }

    this.fixedToCamera = true;

    // render to canvas
    this.renderNineImage();
};

Phaser.NineImage.prototype = Object.create(PIXI.Sprite.prototype);
Phaser.NineImage.prototype.constructor = Phaser.NineImage;

Phaser.Component.Core.install.call(Phaser.NineImage.prototype, [
    'Bounds',
    'Destroy',
    'FixedToCamera',
    'Reset',
    'Smoothed'
]);


// The shared double-copy canvas, created as needed.
Phaser.NineImage.sharedCopyCanvas = null;

// Create if needed (and return) a shared copy canvas that is shared across all NineImages.
// Code that uses the canvas is responsible to ensure the dimensions and save/restore state as appropriate.
Phaser.NineImage.ensureSharedCopyCanvas = function () {
    if (!this.sharedCopyCanvas)
    {
        this.sharedCopyCanvas = Phaser.Canvas.create(2, 2);
    }

    return this.sharedCopyCanvas;
};


Phaser.NineImage.prototype.calculateNineImage = function (width, height, top, left, bottom, right, repeats) {
    var frame = this.nineImageFrame;

    this.centralWidth = frame.width - left - right;
    this.centralHeight = frame.height - top - bottom;
    
    if (repeats) {
        this.horizontalRepeats = width;
        this.verticalRepeats = height;

        this.nineImageWidth = left + right + this.centralWidth * width;
        this.nineImageHeight = top + bottom + this.centralHeight * height;

        this.lastWidth = 0;
        this.lastHeight = 0;
    } else {
        var w = width - left - right;
        this.horizontalRepeats = Math.floor(w / this.centralWidth);
        this.lastWidth = w % this.centralWidth;

        var h = height - top - bottom;
        this.verticalRepeats = Math.floor(h / this.centralHeight);
        this.lastHeight = h % this.centralHeight;

        this.nineImageWidth = width;
        this.nineImageHeight = height;
    }

    this.leftWidth = left;
    this.rightWidth = right;
    this.topHeight = top;
    this.bottomHeight = bottom;
};


Phaser.NineImage.prototype.renderNineImage = function () {
    this.context.save();

    var sourceY = this.nineImageFrame.y;
    var destY = 0;

    // top row
    if (this.topHeight > 0) {
        this.renderNineImageRow(this.nineImage, sourceY, destY, this.topHeight);
        sourceY += this.topHeight;
        destY += this.topHeight;
    }

    // centrals
    for (var i = 0; i < this.verticalRepeats; i++) {
        this.renderNineImageRow(this.nineImage, sourceY, destY, this.centralHeight);
        destY += this.centralHeight;
    }

    // last height
    if (this.lastHeight > 0) {
        this.renderNineImageRow(this.nineImage, sourceY, destY, this.lastHeight);
        destY += this.lastHeight;
    }

    sourceY += this.centralHeight;

    // bottom
    if (this.bottomHeight > 0) {
        this.renderNineImageRow(this.nineImage, sourceY, destY, this.bottomHeight);
    }

    this.baseTexture.dirty();

    this.context.restore();
};

Phaser.NineImage.prototype.renderNineImageRow = function (image, sourceY, destY, height) {
    var sourceX = this.nineImageFrame.x;
    var destX = 0;
    
    // left
    if (this.leftWidth > 0) {
        this.context.drawImage(image, sourceX, sourceY, this.leftWidth, height, destX, destY, this.leftWidth, height);
        destX += this.leftWidth;
        sourceX += this.leftWidth;
    }

    // centrals
    for (var i = 0; i < this.horizontalRepeats; i++) {
        this.context.drawImage(image, sourceX, sourceY, this.centralWidth, height, destX, destY, this.centralWidth, height);
        destX += this.centralWidth;
    }

    // last width
    if (this.lastWidth > 0) {
        this.context.drawImage(image, sourceX, sourceY, this.lastWidth, height, destX, destY, this.lastWidth, height);
        destX += this.lastWidth;
    }

    sourceX += this.centralWidth;

    // right
    if (this.rightWidth > 0) {
        this.context.drawImage(image, sourceX, sourceY, this.rightWidth, height, destX, destY, this.rightWidth, height);
    }
};
