var Helper;
(function (Helper) {
    var eCharType;
    (function (eCharType) {
        eCharType[eCharType["UNDEFINED"] = -1] = "UNDEFINED";
        eCharType[eCharType["SPACE"] = 1] = "SPACE";
        eCharType[eCharType["NEWLINE"] = 2] = "NEWLINE";
        eCharType[eCharType["CHARACTER"] = 3] = "CHARACTER";
    })(eCharType || (eCharType = {}));

    var TextWrapper = (function () {
        function TextWrapper() {
        }
        // -------------------------------------------------------------------------
        TextWrapper.hasNext = function () {
            return TextWrapper.mTextPosition < TextWrapper.mText.length;
        };

        // -------------------------------------------------------------------------
        TextWrapper.getChar = function () {
            return TextWrapper.mText.charAt(TextWrapper.mTextPosition++);
        };

        // -------------------------------------------------------------------------
        TextWrapper.peekChar = function () {
            return TextWrapper.mText.charAt(TextWrapper.mTextPosition);
        };

        // -------------------------------------------------------------------------
        TextWrapper.getPosition = function () {
            return TextWrapper.mTextPosition;
        };

        // -------------------------------------------------------------------------
        TextWrapper.setPosition = function (aPosition) {
            TextWrapper.mTextPosition = aPosition;
        };

        // -------------------------------------------------------------------------
        TextWrapper.getCharAdvance = function (aCharCode, aPrevCharCode) {
            var charData = TextWrapper.mFontData.chars[aCharCode];

            // width
            var advance = charData.xAdvance;

            // kerning
            if (aPrevCharCode > 0 && charData.kerning[aPrevCharCode])
                advance += charData.kerning[aPrevCharCode];

            return advance;
        };

        // -------------------------------------------------------------------------
        TextWrapper.getCharType = function (aChar) {
            if (aChar === ' ')
                return 1 /* SPACE */;
            else if (/(?:\r\n|\r|\n)/.test(aChar))
                return 2 /* NEWLINE */;
            else
                return 3 /* CHARACTER */;
        };

        // -------------------------------------------------------------------------
        TextWrapper.wrapText = function (aText, aWidth, aHeight, aFontName, aSize) {
            // set vars for text processing
            TextWrapper.mText = aText;
            TextWrapper.setPosition(0);

            // font data
            TextWrapper.mFontData = PIXI.BitmapText.fonts[aFontName];

            // if size not defined then take default size
            if (aSize === undefined)
                aSize = TextWrapper.mFontData.size;

            var scale = aSize / TextWrapper.mFontData.size;

            // height of line scaled
            var lineHeight = TextWrapper.mFontData.lineHeight * scale;

            // instead of scaling every single character we will scale line in opposite direction
            var lineWidth = aWidth / scale;

            // result
            var mLineStart = [];
            var mLineChars = [];
            var mPageStart = [];
            var mMaxLine = 0;
            var firstLineOnPage = true;
            var pageCounter = 0;

            // char position in text
            var currentPosition = 0;

            // first line position
            mLineStart[mMaxLine] = currentPosition;

            // first page
            mPageStart[pageCounter++] = 0;

            // remaining height of current page
            var remainingHeight = aHeight;

            while (TextWrapper.hasNext()) {
                var charCount = 0;

                // saves number of chars before last space
                var saveSpaceCharCount = 0;
                var saveCharPosition = -1;

                // (previous) type of SBC character
                var type = -1 /* UNDEFINED */;
                var previousType = -1 /* UNDEFINED */;

                // remaining width will decrease with words read
                var remainingWidth = lineWidth;

                // previous char code
                var prevCharCode = -1;

                while (TextWrapper.hasNext()) {
                    currentPosition = TextWrapper.getPosition();

                    // read char and move in text by 1 character forward
                    var char = TextWrapper.getChar();

                    // get type and code
                    type = TextWrapper.getCharType(char);
                    var charCode = char.charCodeAt(0);

                    // process based on type
                    if (type === 1 /* SPACE */) {
                        if (previousType != 1 /* SPACE */)
                            saveSpaceCharCount = charCount;

                        ++charCount;
                        remainingWidth -= TextWrapper.getCharAdvance(charCode, prevCharCode);
                    } else if (type === 3 /* CHARACTER */) {
                        if (previousType !== 3 /* CHARACTER */)
                            saveCharPosition = currentPosition;

                        remainingWidth -= TextWrapper.getCharAdvance(charCode, prevCharCode);

                        if (remainingWidth < 0)
                            break;

                        ++charCount;
                    } else if (type === 2 /* NEWLINE */) {
                        var breakLoop = false;

                        // if there is no more text then ignore new line
                        if (TextWrapper.hasNext()) {
                            breakLoop = true;
                            saveSpaceCharCount = charCount;
                            saveCharPosition = TextWrapper.getPosition();
                            currentPosition = saveCharPosition;

                            // simulate normal width overflow
                            remainingWidth = -1;
                            type = 3 /* CHARACTER */;
                        }

                        if (breakLoop)
                            break;
                    }

                    previousType = type;
                    prevCharCode = charCode;
                }

                // lines / pages
                remainingHeight -= lineHeight;

                // set new page if not enough remaining height
                if (remainingHeight < 0)
                    mPageStart[pageCounter++] = mMaxLine;

                if (remainingWidth < 0 && type === 3 /* CHARACTER */) {
                    if (saveSpaceCharCount != 0)
                        mLineChars[mMaxLine] = saveSpaceCharCount;
                    else
                        mLineChars[mMaxLine] = charCount;

                    // does new line still fits into current page?
                    firstLineOnPage = false;

                    // set new page
                    if (remainingHeight < 0) {
                        firstLineOnPage = true;
                        remainingHeight = aHeight - lineHeight;
                    }

                    if (saveSpaceCharCount != 0) {
                        mLineStart[++mMaxLine] = saveCharPosition;
                        TextWrapper.setPosition(saveCharPosition);
                    } else {
                        mLineStart[++mMaxLine] = currentPosition;
                        TextWrapper.setPosition(currentPosition);
                    }
                } else if (!TextWrapper.hasNext()) {
                    if (type === 3 /* CHARACTER */) {
                        mLineChars[mMaxLine] = charCount;
                    } else if (type === 1 /* SPACE */) {
                        mLineChars[mMaxLine] = saveSpaceCharCount;
                    }
                }
            }

            mPageStart[pageCounter] = mMaxLine + 1;

            // lines into string[]
            var result = [];

            for (var i = 1; i <= pageCounter; i++) {
                var firstLine = mPageStart[i - 1];
                var lastLine = mPageStart[i];

                var pageText = [];
                for (var l = firstLine; l < lastLine; l++) {
                    pageText.push(TextWrapper.mText.substr(mLineStart[l], mLineChars[l]));
                }

                result.push(pageText.join("\n"));
            }

            return result;
        };
        return TextWrapper;
    })();
    Helper.TextWrapper = TextWrapper;
})(Helper || (Helper = {}));
//# sourceMappingURL=TextWrapper.js.map
