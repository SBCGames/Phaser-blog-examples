var Helper;
(function (Helper) {
    var IdNameMap = (function () {
        function IdNameMap() {
            this._items = [];
            this._itemNames = [];
        }
        // -------------------------------------------------------------------------
        IdNameMap.prototype.add = function (aItem, aId, aName) {
            if (aId === undefined) {
                aId = this._items.length;
            }
            if (aName === undefined || aName === null) {
                aName = "item_" + aId;
            }
            this._items[aId] = aItem;
            this._itemNames[aName] = aId;
        };
        // -------------------------------------------------------------------------
        IdNameMap.prototype.getById = function (aId) {
            return this._items[aId];
        };
        // -------------------------------------------------------------------------
        IdNameMap.prototype.getByName = function (aName) {
            var id = this._itemNames[aName];
            // TODO remove
            if (typeof id !== "number") {
                console.warn("item " + aName + "  not found!");
            }
            return (typeof id === "number") ? this._items[id] : null;
        };
        Object.defineProperty(IdNameMap.prototype, "length", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._items.length;
            },
            enumerable: true,
            configurable: true
        });
        return IdNameMap;
    })();
    Helper.IdNameMap = IdNameMap;
})(Helper || (Helper = {}));
var Spriter;
(function (Spriter) {
    (function (eAnimationLooping) {
        eAnimationLooping[eAnimationLooping["NO_LOOPING"] = 0] = "NO_LOOPING";
        eAnimationLooping[eAnimationLooping["LOOPING"] = 1] = "LOOPING";
    })(Spriter.eAnimationLooping || (Spriter.eAnimationLooping = {}));
    var eAnimationLooping = Spriter.eAnimationLooping;
    ;
    var Animation = (function () {
        // -------------------------------------------------------------------------
        function Animation(aId, aName, aLength, aLoopType) {
            this._mainLineKeys = [];
            this._id = aId;
            this._name = aName;
            this._length = aLength;
            this._loopType = aLoopType;
            this._timelines = new Helper.IdNameMap();
        }
        Object.defineProperty(Animation.prototype, "mainLineKeys", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._mainLineKeys;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        Animation.prototype.addMainLineKey = function (aMainLineKey) {
            this._mainLineKeys.push(aMainLineKey);
        };
        // -------------------------------------------------------------------------
        Animation.prototype.addTimeline = function (aTimeline) {
            this._timelines.add(aTimeline, aTimeline.id, aTimeline.name);
        };
        // -------------------------------------------------------------------------
        Animation.prototype.getTimelineById = function (aId) {
            return this._timelines.getById(aId);
        };
        // -------------------------------------------------------------------------
        Animation.prototype.getTimelineByName = function (aName) {
            return this._timelines.getByName(aName);
        };
        Object.defineProperty(Animation.prototype, "id", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "name", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "length", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Animation.prototype, "loopType", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._loopType;
            },
            enumerable: true,
            configurable: true
        });
        return Animation;
    })();
    Spriter.Animation = Animation;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Entity = (function () {
        // -------------------------------------------------------------------------
        function Entity(aId, aName) {
            this._id = aId;
            this._name = aName;
            this._objectInfos = new Helper.IdNameMap();
            this._animations = new Helper.IdNameMap();
        }
        // -------------------------------------------------------------------------
        Entity.prototype.addObjectInfo = function (aObjectInfo) {
            this._objectInfos.add(aObjectInfo, aObjectInfo.id, aObjectInfo.name);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getObjectInfoById = function (aId) {
            return this._objectInfos.getById(aId);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getObjectInfoByName = function (aName) {
            return this._objectInfos.getByName(aName);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.addAnimation = function (aAnimation) {
            this._animations.add(aAnimation, aAnimation.id, aAnimation.name);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getAnimationById = function (aId) {
            return this._animations.getById(aId);
        };
        // -------------------------------------------------------------------------
        Entity.prototype.getAnimationByName = function (aName) {
            return this._animations.getByName(aName);
        };
        Object.defineProperty(Entity.prototype, "animationsCount", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._animations.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "id", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Entity.prototype, "name", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return Entity;
    })();
    Spriter.Entity = Entity;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var File = (function () {
        // -------------------------------------------------------------------------
        function File(aId, aName, aAnchorX, aAnchorY) {
            this._id = aId;
            this._name = aName;
            this._anchorX = aAnchorX;
            this._anchorY = aAnchorY;
        }
        Object.defineProperty(File.prototype, "id", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "name", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "anchorX", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._anchorX;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "anchorY", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._anchorY;
            },
            enumerable: true,
            configurable: true
        });
        return File;
    })();
    Spriter.File = File;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Folder = (function () {
        // -------------------------------------------------------------------------
        function Folder(aId, aName) {
            this._id = aId;
            this._name = aName;
            this._files = new Helper.IdNameMap();
        }
        // -------------------------------------------------------------------------
        Folder.prototype.addFile = function (aFile) {
            this._files.add(aFile, aFile.id, aFile.name);
        };
        // -------------------------------------------------------------------------
        Folder.prototype.getFileById = function (aId) {
            return this._files.getById(aId);
        };
        // -------------------------------------------------------------------------
        Folder.prototype.getFileByName = function (aName) {
            return this._files.getByName(aName);
        };
        Object.defineProperty(Folder.prototype, "id", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "name", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return Folder;
    })();
    Spriter.Folder = Folder;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var MainLineKey = (function () {
        // -------------------------------------------------------------------------
        function MainLineKey(aTime) {
            this._boneRefs = [];
            this._objectRefs = [];
            this._time = aTime;
        }
        Object.defineProperty(MainLineKey.prototype, "boneRefs", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._boneRefs;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        MainLineKey.prototype.addBoneRef = function (aBoneRef) {
            this._boneRefs.push(aBoneRef);
        };
        Object.defineProperty(MainLineKey.prototype, "objectRefs", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._objectRefs;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        MainLineKey.prototype.addObjectRef = function (aObjectRef) {
            this._objectRefs.push(aObjectRef);
        };
        Object.defineProperty(MainLineKey.prototype, "time", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._time;
            },
            enumerable: true,
            configurable: true
        });
        return MainLineKey;
    })();
    Spriter.MainLineKey = MainLineKey;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var ObjectInfo = (function () {
        // -------------------------------------------------------------------------
        function ObjectInfo(aId, aName, aType, aWidth, aHeight) {
            this._id = aId;
            this._type = aType;
            this._name = aName;
            this._width = aWidth;
            this._height = aHeight;
        }
        Object.defineProperty(ObjectInfo.prototype, "id", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "type", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "name", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "width", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectInfo.prototype, "height", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._height;
            },
            enumerable: true,
            configurable: true
        });
        return ObjectInfo;
    })();
    Spriter.ObjectInfo = ObjectInfo;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    (function (eObjectType) {
        eObjectType[eObjectType["SPRITE"] = 0] = "SPRITE";
        eObjectType[eObjectType["BONE"] = 1] = "BONE"; /*, BOX, POINT, SOUND, ENTITY, VARIABLE */
    })(Spriter.eObjectType || (Spriter.eObjectType = {}));
    var eObjectType = Spriter.eObjectType;
    ;
    var ObjectType = (function () {
        function ObjectType() {
        }
        // -------------------------------------------------------------------------
        ObjectType.getObjectTypeForName = function (aTypeName) {
            if (aTypeName === "sprite") {
                return eObjectType.SPRITE;
            }
            else if (aTypeName === "bone") {
                return eObjectType.BONE;
            }
        };
        return ObjectType;
    })();
    Spriter.ObjectType = ObjectType;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Ref = (function () {
        // -------------------------------------------------------------------------
        function Ref(aId, aParent, aTimeline, aKey, aZ) {
            if (aZ === void 0) { aZ = 0; }
            this.id = aId;
            this.parent = aParent;
            this.timeline = aTimeline;
            this.key = aKey;
            this.z = aZ;
        }
        return Ref;
    })();
    Spriter.Ref = Ref;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Timeline = (function () {
        // -------------------------------------------------------------------------
        function Timeline(aId, aName, aType, aObjectRef) {
            if (aType === void 0) { aType = Spriter.eObjectType.SPRITE; }
            if (aObjectRef === void 0) { aObjectRef = -1; }
            this._keys = [];
            this._id = aId;
            this._name = aName;
            this._type = aType;
            this._objectRef = aObjectRef;
        }
        Object.defineProperty(Timeline.prototype, "keys", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._keys;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        Timeline.prototype.addKey = function (aKey) {
            this._keys.push(aKey);
        };
        Object.defineProperty(Timeline.prototype, "id", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timeline.prototype, "name", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timeline.prototype, "type", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Timeline.prototype, "objectRef", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._objectRef;
            },
            enumerable: true,
            configurable: true
        });
        return Timeline;
    })();
    Spriter.Timeline = Timeline;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var TimelineKey = (function () {
        // -------------------------------------------------------------------------
        function TimelineKey(aId, aTime) {
            this._id = aId;
            this._time = aTime;
        }
        Object.defineProperty(TimelineKey.prototype, "id", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimelineKey.prototype, "time", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._time;
            },
            enumerable: true,
            configurable: true
        });
        return TimelineKey;
    })();
    Spriter.TimelineKey = TimelineKey;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpatialInfo = (function () {
        function SpatialInfo() {
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.alpha = 1;
            this.angle = 0;
            this.spin = 0;
        }
        return SpatialInfo;
    })();
    Spriter.SpatialInfo = SpatialInfo;
})(Spriter || (Spriter = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Spriter;
(function (Spriter) {
    var SpatialTimelineKey = (function (_super) {
        __extends(SpatialTimelineKey, _super);
        function SpatialTimelineKey() {
            _super.apply(this, arguments);
            this._info = new Spriter.SpatialInfo();
        }
        Object.defineProperty(SpatialTimelineKey.prototype, "info", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._info;
            },
            enumerable: true,
            configurable: true
        });
        return SpatialTimelineKey;
    })(Spriter.TimelineKey);
    Spriter.SpatialTimelineKey = SpatialTimelineKey;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var ObjectTimelineKey = (function (_super) {
        __extends(ObjectTimelineKey, _super);
        // -------------------------------------------------------------------------
        function ObjectTimelineKey(aId, aTime, aFolder, aFile) {
            _super.call(this, aId, aTime);
            this._folder = aFolder;
            this._file = aFile;
        }
        Object.defineProperty(ObjectTimelineKey.prototype, "folder", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._folder;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ObjectTimelineKey.prototype, "file", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._file;
            },
            enumerable: true,
            configurable: true
        });
        return ObjectTimelineKey;
    })(Spriter.SpatialTimelineKey);
    Spriter.ObjectTimelineKey = ObjectTimelineKey;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var BoneTimelineKey = (function (_super) {
        __extends(BoneTimelineKey, _super);
        function BoneTimelineKey() {
            _super.apply(this, arguments);
        }
        return BoneTimelineKey;
    })(Spriter.SpatialTimelineKey);
    Spriter.BoneTimelineKey = BoneTimelineKey;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var Loader = (function () {
        function Loader() {
        }
        // -------------------------------------------------------------------------
        Loader.prototype.getFileNameWithoutExtension = function (aPath) {
            var name = (aPath.split('\\').pop().split('/').pop().split('.'))[0];
            return name;
        };
        // -------------------------------------------------------------------------
        Loader.prototype.parseInt = function (aElement, aAttributeName, aDefaultValue) {
            if (aDefaultValue === void 0) { aDefaultValue = 0; }
            var value = aElement.getAttribute(aAttributeName);
            return value !== null ? parseInt(value) : aDefaultValue;
        };
        // -------------------------------------------------------------------------
        Loader.prototype.parseFloat = function (aElement, aAttributeName, aDefaultValue) {
            if (aDefaultValue === void 0) { aDefaultValue = 0; }
            var value = aElement.getAttribute(aAttributeName);
            return value !== null ? parseFloat(value) : aDefaultValue;
        };
        // -------------------------------------------------------------------------
        Loader.prototype.parseString = function (aElement, aAttributeName, aDefaultValue) {
            if (aDefaultValue === void 0) { aDefaultValue = ""; }
            var value = aElement.getAttribute(aAttributeName);
            return value !== null ? value : aDefaultValue;
        };
        // -------------------------------------------------------------------------
        Loader.prototype.load = function (aData) {
            var spriter = new Spriter.Spriter();
            // folders and files
            var folders = aData.getElementsByTagName("folder");
            this.loadFolders(spriter, folders);
            // entity
            var entities = aData.getElementsByTagName("entity");
            this.loadEntities(spriter, entities);
            return spriter;
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadFolders = function (aSpriter, aFolders) {
            // through all folders
            for (var i = 0; i < aFolders.length; i++) {
                var folderElm = aFolders.item(i);
                var folder = new Spriter.Folder(this.parseInt(folderElm, "id"), folderElm.getAttribute("name"));
                // images in folder
                var files = folderElm.getElementsByTagName("file");
                this.loadFiles(folder, files);
                // add folder to spriter object
                aSpriter.addFolder(folder);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadFiles = function (aFolder, aFiles) {
            for (var f = 0; f < aFiles.length; f++) {
                var fileElm = aFiles[f];
                var file = new Spriter.File(this.parseInt(fileElm, "id"), this.getFileNameWithoutExtension(fileElm.getAttribute("name")), this.parseFloat(fileElm, "pivot_x"), 1 - this.parseFloat(fileElm, "pivot_y"));
                aFolder.addFile(file);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadEntities = function (aSpriter, aEntities) {
            for (var i = 0; i < aEntities.length; i++) {
                var entityElm = aEntities.item(i);
                var entity = new Spriter.Entity(this.parseInt(entityElm, "id"), entityElm.getAttribute("name"));
                var bones = entityElm.getElementsByTagName("obj_info");
                this.loadBones(entity, bones);
                var animations = entityElm.getElementsByTagName("animation");
                this.loadAnimations(entity, animations);
                aSpriter.addEntity(entity);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadBones = function (aEntity, aBones) {
            for (var i = 0; i < aBones.length; i++) {
                var boneElm = aBones.item(i);
                var bone = new Spriter.ObjectInfo(i, boneElm.getAttribute("name"), Spriter.ObjectType.getObjectTypeForName(boneElm.getAttribute("type")), this.parseFloat(boneElm, "w"), this.parseFloat(boneElm, "h"));
                aEntity.addObjectInfo(bone);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadAnimations = function (aEntity, aAnimations) {
            for (var i = 0; i < aAnimations.length; i++) {
                var animationElm = aAnimations.item(i);
                var animation = new Spriter.Animation(this.parseInt(animationElm, "id"), animationElm.getAttribute("name"), this.parseFloat(animationElm, "length"), this.parseString(animationElm, "looping", "true") === "true" ? Spriter.eAnimationLooping.LOOPING : Spriter.eAnimationLooping.NO_LOOPING);
                // main line keys
                var mainLineKeys = animationElm.firstElementChild.getElementsByTagName("key");
                this.loadMainLineKeys(animation, mainLineKeys);
                // timelines
                var timelines = animationElm.getElementsByTagName("timeline");
                this.loadTimelines(animation, timelines);
                aEntity.addAnimation(animation);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadMainLineKeys = function (aAnimation, aMainLineKeys) {
            for (var i = 0; i < aMainLineKeys.length; i++) {
                var keyElm = aMainLineKeys.item(i);
                var mainLineKey = new Spriter.MainLineKey(this.parseFloat(keyElm, "time"));
                // load bone refs
                var boneRefs = keyElm.getElementsByTagName("bone_ref");
                for (var b = 0; b < boneRefs.length; b++) {
                    mainLineKey.addBoneRef(this.loadRef(boneRefs.item(b)));
                }
                // load sprite refs (object refs)
                var spriteRefs = keyElm.getElementsByTagName("object_ref");
                for (var s = 0; s < spriteRefs.length; s++) {
                    mainLineKey.addObjectRef(this.loadRef(spriteRefs.item(s)));
                }
                aAnimation.addMainLineKey(mainLineKey);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadRef = function (aRefElement) {
            var ref = new Spriter.Ref(this.parseInt(aRefElement, "id"), this.parseInt(aRefElement, "parent", -1), this.parseInt(aRefElement, "timeline"), this.parseInt(aRefElement, "key"), this.parseInt(aRefElement, "z_index"));
            return ref;
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadTimelines = function (aAnimation, aTimelines) {
            for (var i = 0; i < aTimelines.length; i++) {
                var timelineElm = aTimelines.item(i);
                var timeline = new Spriter.Timeline(this.parseInt(timelineElm, "id"), timelineElm.getAttribute("name"), timelineElm.getAttribute("object_type") === "bone" ? Spriter.eObjectType.BONE : Spriter.eObjectType.SPRITE, this.parseInt(timelineElm, "obj", -1));
                var keys = timelineElm.getElementsByTagName("key");
                this.loadTimelineKeys(timeline, keys);
                aAnimation.addTimeline(timeline);
            }
        };
        // -------------------------------------------------------------------------
        Loader.prototype.loadTimelineKeys = function (aTimeline, aKeys) {
            for (var i = 0; i < aKeys.length; i++) {
                var keyElm = aKeys.item(i);
                // sprite or bone key?
                var key = null;
                var keyDataElm = keyElm.firstElementChild;
                var time = this.parseInt(keyElm, "time");
                if (keyDataElm.tagName === "bone") {
                    key = new Spriter.BoneTimelineKey(i, time);
                }
                else if (keyDataElm.tagName === "object") {
                    key = new Spriter.ObjectTimelineKey(i, time, this.parseInt(keyDataElm, "folder"), this.parseInt(keyDataElm, "file"));
                }
                else {
                    console.warn("Unknown key type: " + keyDataElm.tagName);
                }
                var info = key.info;
                info.spin = this.parseInt(keyElm, "spin", 1);
                info.x = this.parseFloat(keyDataElm, "x");
                info.y = -this.parseFloat(keyDataElm, "y");
                info.scaleX = this.parseFloat(keyDataElm, "scale_x", 1);
                info.scaleY = this.parseFloat(keyDataElm, "scale_y", 1);
                info.angle = 360 - this.parseFloat(keyDataElm, "angle");
                info.alpha = this.parseFloat(keyDataElm, "a", 1);
                aTimeline.addKey(key);
            }
        };
        return Loader;
    })();
    Spriter.Loader = Loader;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter_1) {
    var Spriter = (function () {
        // -------------------------------------------------------------------------
        function Spriter() {
            this._folders = new Helper.IdNameMap();
            this._entities = new Helper.IdNameMap();
        }
        // -------------------------------------------------------------------------
        Spriter.prototype.addFolder = function (aFolder) {
            this._folders.add(aFolder, aFolder.id, aFolder.name);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.getFolderById = function (aId) {
            return this._folders.getById(aId);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.getFolderByName = function (aName) {
            return this._folders.getByName(aName);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.addEntity = function (aEntitiy) {
            this._entities.add(aEntitiy, aEntitiy.id, aEntitiy.name);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.getEntityById = function (aId) {
            return this._entities.getById(aId);
        };
        // -------------------------------------------------------------------------
        Spriter.prototype.getEntityByName = function (aName) {
            return this._entities.getByName(aName);
        };
        return Spriter;
    })();
    Spriter_1.Spriter = Spriter;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterBone = (function () {
        // -------------------------------------------------------------------------
        function SpriterBone() {
            this.timelineKey = -1;
            this.transformed = new Spriter.SpatialInfo();
        }
        // -------------------------------------------------------------------------
        SpriterBone.prototype.setOn = function (aOn) {
            this._on = aOn;
        };
        Object.defineProperty(SpriterBone.prototype, "on", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._on;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        SpriterBone.prototype.setKey = function (aAnimation, aTimelineId, aKeyId) {
            this.timelineKey = aKeyId;
            var keys = aAnimation.getTimelineById(aTimelineId).keys;
            var keyFrom = keys[aKeyId];
            // in the end loop to first key. If animation is not looping, then repeat last key
            var endIndex = (aKeyId + 1) % keys.length;
            if (endIndex === 0 && aAnimation.loopType === Spriter.eAnimationLooping.NO_LOOPING) {
                endIndex = aKeyId;
            }
            var keyTo = keys[endIndex];
            this.key = keyFrom;
            this.timeFrom = keyFrom.time;
            this.timeTo = keyTo.time;
            // if loop to key 0
            if (this.timeTo < this.timeFrom) {
                this.timeTo = aAnimation.length;
            }
            this.from = keyFrom.info;
            this.to = keyTo.info;
            // create update mask
            this.updateMask = 0;
            if (Math.abs(this.from.x - this.to.x) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_X;
            }
            if (Math.abs(this.from.y - this.to.y) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_Y;
            }
            if (Math.abs(this.from.scaleX - this.to.scaleX) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_SCALE_X;
            }
            if (Math.abs(this.from.scaleY - this.to.scaleY) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_SCALE_Y;
            }
            if (Math.abs(this.from.alpha - this.to.alpha) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_ALPHA;
            }
            if (Math.abs(this.from.angle - this.to.angle) > 0.001) {
                this.updateMask += SpriterBone.UPDATE_ANGLE;
            }
            // init data
            this.transformed.x = this.from.x;
            this.transformed.y = this.from.y;
            this.transformed.scaleX = this.from.scaleX;
            this.transformed.scaleY = this.from.scaleY;
            this.transformed.angle = this.from.angle;
            this.transformed.alpha = this.from.alpha;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.tween = function (aTime) {
            // calculate normalized time
            var t = Phaser.Math.clamp((aTime - this.timeFrom) / (this.timeTo - this.timeFrom), 0, 1);
            this.transformed.x = (this.updateMask & SpriterBone.UPDATE_X) > 0 ? this.linear(this.from.x, this.to.x, t) : this.from.x;
            this.transformed.y = (this.updateMask & SpriterBone.UPDATE_Y) > 0 ? this.linear(this.from.y, this.to.y, t) : this.from.y;
            this.transformed.scaleX = (this.updateMask & SpriterBone.UPDATE_SCALE_X) > 0 ? this.linear(this.from.scaleX, this.to.scaleX, t) : this.from.scaleX;
            this.transformed.scaleY = (this.updateMask & SpriterBone.UPDATE_SCALE_Y) > 0 ? this.linear(this.from.scaleY, this.to.scaleY, t) : this.from.scaleY;
            this.transformed.alpha = (this.updateMask & SpriterBone.UPDATE_ALPHA) > 0 ? this.linear(this.from.alpha, this.to.alpha, t) : this.from.alpha;
            this.transformed.angle = (this.updateMask & SpriterBone.UPDATE_ANGLE) > 0 ? this.angleLinear(this.from.angle, this.to.angle, this.from.spin, t) : this.from.angle;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.update = function (aParent) {
            this.transformed.angle *= Phaser.Math.sign(aParent.scaleX) * Phaser.Math.sign(aParent.scaleY);
            this.transformed.angle += aParent.angle;
            this.transformed.scaleX *= aParent.scaleX;
            this.transformed.scaleY *= aParent.scaleY;
            this.scalePosition(aParent.scaleX, aParent.scaleY);
            this.rotatePosition(aParent.angle);
            this.translatePosition(aParent.x, aParent.y);
            this.transformed.alpha *= aParent.alpha;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.scalePosition = function (aParentScaleX, aParentScaleY) {
            this.transformed.x *= aParentScaleX;
            this.transformed.y *= aParentScaleY;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.rotatePosition = function (aParentAngle) {
            var x = this.transformed.x;
            var y = this.transformed.y;
            if (x !== 0 || y !== 0) {
                var rads = aParentAngle * (Math.PI / 180);
                var cos = Math.cos(rads);
                var sin = Math.sin(rads);
                this.transformed.x = x * cos - y * sin;
                this.transformed.y = x * sin + y * cos;
            }
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.translatePosition = function (aParentX, aParentY) {
            this.transformed.x += aParentX;
            this.transformed.y += aParentY;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.linear = function (aA, aB, aT) {
            return ((aB - aA) * aT) + aA;
        };
        // -------------------------------------------------------------------------
        SpriterBone.prototype.angleLinear = function (aAngleA, aAngleB, aSpin, aT) {
            // no spin
            if (aSpin === 0) {
                return aAngleA;
            }
            // spin left
            if (aSpin > 0) {
                if (aAngleB > aAngleA) {
                    aAngleB -= 360;
                }
            }
            else {
                if (aAngleB < aAngleA) {
                    aAngleB += 360;
                }
            }
            return this.linear(aAngleA, aAngleB, aT);
        };
        SpriterBone.UPDATE_X = 1;
        SpriterBone.UPDATE_Y = 2;
        SpriterBone.UPDATE_SCALE_X = 4;
        SpriterBone.UPDATE_SCALE_Y = 8;
        SpriterBone.UPDATE_ANGLE = 16;
        SpriterBone.UPDATE_ALPHA = 32;
        return SpriterBone;
    })();
    Spriter.SpriterBone = SpriterBone;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterGroup = (function (_super) {
        __extends(SpriterGroup, _super);
        // -------------------------------------------------------------------------
        function SpriterGroup(aGame, aSpriter, aTextureKey, aEntityName, aAnimation, aAnimationSpeedPercent) {
            _super.call(this, aGame, null);
            this._bones = [];
            this._objects = [];
            this._pause = false;
            this._spriter = aSpriter;
            this._entityName = aEntityName;
            this._textureKey = aTextureKey;
            this._root = new Spriter.SpatialInfo();
            // set animation speed
            if (aAnimationSpeedPercent === undefined) {
                aAnimationSpeedPercent = 100;
            }
            this.setAnimationSpeedPercent(aAnimationSpeedPercent);
            // set animation
            if (aAnimation === undefined || aAnimation === null) {
                // set first animation
                this.setAnimationById(0);
            }
            else if (typeof aAnimation === "number") {
                this.setAnimationById(aAnimation);
            }
            else {
                this.setAnimationByName(aAnimation);
            }
        }
        Object.defineProperty(SpriterGroup.prototype, "animationCount", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._spriter.getEntityByName(this._entityName).animationsCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SpriterGroup.prototype, "currentAnimationName", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._currentAnimationName;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.setAnimationSpeedPercent = function (aAnimationSpeedPercent) {
            if (aAnimationSpeedPercent === void 0) { aAnimationSpeedPercent = 100; }
            this._animationSpeed = aAnimationSpeedPercent / 100;
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.setAnimationById = function (aAnimationId) {
            var animation = this._spriter.getEntityByName(this._entityName).getAnimationById(aAnimationId);
            if (animation === undefined || animation === null) {
                console.warn("Animation " + aAnimationId + " for entity " + this._entityName + " does not exist!");
                return;
            }
            this.setAnimation(animation);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.setAnimationByName = function (aAnimationName) {
            var animation = this._spriter.getEntityByName(this._entityName).getAnimationByName(aAnimationName);
            if (animation === undefined || animation === null) {
                console.warn("Animation " + aAnimationName + " for entity " + this._entityName + " does not exist!");
                return;
            }
            this.setAnimation(animation);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.setAnimation = function (aAnimation) {
            this._currentAnimationName = aAnimation.name;
            this._animation = aAnimation;
            this._finished = false;
            // reset time to beginning of animation and find first from and to keys
            this.clearTime();
            // create bones and sprites - based on data in mainLine key 0
            this.loadKeys(0, true);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.clearTime = function () {
            this._time = 0;
            this._keyIndex = -1;
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.getNextMainLineKeyTime = function (aTime) {
            var keys = this._animation.mainLineKeys;
            var newIndex = (this._keyIndex + 1) % keys.length;
            this._nextTime = newIndex !== 0 ? keys[newIndex].time : this._animation.length;
            // game is lagging or keys are to close to each other - notify in console
            if (newIndex !== 0 && this._nextTime < aTime) {
                console.log("Game is lagging or keys are too close to each other...");
            }
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.setBones = function (aBones, aForce) {
            if (aForce === void 0) { aForce = false; }
            // switch off all existing bones
            for (var i = 0; i < this._bones.length; i++) {
                if (this._bones[i] !== undefined) {
                    this._bones[i].setOn(false);
                }
            }
            // go through all bones and add new ones if necessary and activate used ones
            for (var i = 0; i < aBones.length; i++) {
                var ref = aBones[i];
                // if bone does not exist add it and make active, else make it active only
                if (this._bones[ref.id] === undefined) {
                    this._bones[ref.id] = new Spriter.SpriterBone();
                }
                var bone = this._bones[ref.id];
                bone.setOn(true);
                bone.parent = ref.parent;
                if (bone.timelineKey != ref.key || aForce) {
                    bone.setKey(this._animation, ref.timeline, ref.key);
                }
            }
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.setObjects = function (aObjects, aForce) {
            if (aForce === void 0) { aForce = false; }
            // switch off (kill) all existing sprites
            for (var i = 0; i < this._objects.length; i++) {
                if (this._objects[i] !== undefined) {
                    this._objects[i].setOn(false);
                }
            }
            // go through all objects/sprites and add new ones if necessary and activate used ones
            var zChange = false;
            for (var i = 0; i < aObjects.length; i++) {
                var ref = aObjects[i];
                var object = null;
                var sprite = null;
                // if sprite does not exist add it and make active, else make it active only
                if (this._objects[ref.id] === undefined) {
                    sprite = new Phaser.Sprite(this.game, 0, 0, this._textureKey);
                    object = new Spriter.SpriterObject(this._spriter, sprite);
                    this._objects[ref.id] = object;
                    this.add(sprite);
                }
                else {
                    object = this._objects[ref.id];
                    sprite = object.sprite;
                }
                object.setOn(true);
                object.parent = ref.parent;
                if (object.sprite.z !== ref.z) {
                    object.sprite.z = ref.z;
                    zChange = true;
                }
                if (object.timelineKey != ref.key || aForce) {
                    object.setKey(this._animation, ref.timeline, ref.key);
                }
            }
            // need to sort sprites?
            if (zChange) {
                this.sort();
            }
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.loadKeys = function (aMainLineKeyIndex, aForce) {
            if (aForce === void 0) { aForce = false; }
            // create or update bones and sprites
            this.setBones(this._animation.mainLineKeys[aMainLineKeyIndex].boneRefs, aForce);
            this.setObjects(this._animation.mainLineKeys[aMainLineKeyIndex].objectRefs, aForce);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.updateAnimation = function () {
            if (this._pause || this._finished) {
                return;
            }
            if (this._keyIndex === -1 || this._time > this._nextTime) {
                this._keyIndex = (this._keyIndex + 1) % this._animation.mainLineKeys.length;
                // start anim from beginning again
                if (this._time > this._animation.length) {
                    if (this._animation.loopType === Spriter.eAnimationLooping.NO_LOOPING) {
                        // prevent skipping all keys in the very end of animation - loop through all of them and adjust sprites
                        while (this._keyIndex !== 0) {
                            this.getNextMainLineKeyTime(this._time);
                            this.loadKeys(this._keyIndex);
                            this.updateCharacter();
                            this._keyIndex = (this._keyIndex + 1) % this._animation.mainLineKeys.length;
                        }
                        this._finished = true;
                        return;
                    }
                    this._time = 0;
                    this._keyIndex = 0;
                }
                this.getNextMainLineKeyTime(this._time);
                this.loadKeys(this._keyIndex);
            }
            this.updateCharacter();
            this._time += (this.game.time.physicsElapsedMS * this._animationSpeed);
        };
        // -------------------------------------------------------------------------
        SpriterGroup.prototype.updateCharacter = function () {
            for (var i = 0; i < this._bones.length; i++) {
                var bone = this._bones[i];
                if (bone.on) {
                    var parentSpatial = (bone.parent === -1) ? this._root : this._bones[bone.parent].transformed;
                    bone.tween(this._time);
                    bone.update(parentSpatial);
                }
            }
            for (var i = 0; i < this._objects.length; i++) {
                var object = this._objects[i];
                if (object.on) {
                    var parentSpatial = (object.parent === -1) ? this._root : this._bones[object.parent].transformed;
                    object.tween(this._time);
                    object.update(parentSpatial);
                }
            }
        };
        return SpriterGroup;
    })(Phaser.Group);
    Spriter.SpriterGroup = SpriterGroup;
})(Spriter || (Spriter = {}));
var Spriter;
(function (Spriter) {
    var SpriterObject = (function (_super) {
        __extends(SpriterObject, _super);
        // -------------------------------------------------------------------------
        function SpriterObject(aSpriter, aSprite) {
            _super.call(this);
            this._spriter = aSpriter;
            this._sprite = aSprite;
        }
        Object.defineProperty(SpriterObject.prototype, "sprite", {
            // -------------------------------------------------------------------------
            get: function () {
                return this._sprite;
            },
            enumerable: true,
            configurable: true
        });
        // -------------------------------------------------------------------------
        SpriterObject.prototype.setOn = function (aOn) {
            _super.prototype.setOn.call(this, aOn);
            this._sprite.exists = aOn;
            this._sprite.visible = aOn;
        };
        // -------------------------------------------------------------------------
        SpriterObject.prototype.setKey = function (aAnimation, aTimelineId, aKeyId) {
            _super.prototype.setKey.call(this, aAnimation, aTimelineId, aKeyId);
            // set sprite
            var spriteKey = this.key;
            var file = this._spriter.getFolderById(spriteKey.folder).getFileById(spriteKey.file);
            this._sprite.frameName = file.name;
            this._sprite.anchor.setTo(file.anchorX, file.anchorY);
        };
        // -------------------------------------------------------------------------
        SpriterObject.prototype.update = function (aParent) {
            _super.prototype.update.call(this, aParent);
            this.updateSprite();
        };
        // -------------------------------------------------------------------------
        SpriterObject.prototype.updateSprite = function () {
            var t = this.transformed;
            var s = this.sprite;
            s.position.setTo(t.x, t.y);
            s.scale.setTo(t.scaleX, t.scaleY);
            s.alpha = t.alpha;
            s.angle = t.angle;
        };
        return SpriterObject;
    })(Spriter.SpriterBone);
    Spriter.SpriterObject = SpriterObject;
})(Spriter || (Spriter = {}));
var SpriterExample;
(function (SpriterExample) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        // -------------------------------------------------------------------------
        function Boot() {
            _super.call(this);
        }
        // -------------------------------------------------------------------------
        Boot.prototype.init = function () {
            this.input.maxPointers = 1;
            // pause game when not focused
            this.stage.disableVisibilityChange = false;
        };
        // -------------------------------------------------------------------------
        Boot.prototype.create = function () {
            this.game.state.start("Preloader", true, false);
        };
        return Boot;
    })(Phaser.State);
    SpriterExample.Boot = Boot;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        // -------------------------------------------------------------------------
        function Preloader() {
            _super.call(this);
        }
        // -------------------------------------------------------------------------
        Preloader.prototype.preload = function () {
            // load assets
            var path = SpriterExample.Global.assetsPath;
            this.load.atlas("Hero", path + "Hero.png", path + "Hero.json");
            this.load.xml("HeroData", path + "Hero.xml");
        };
        // -------------------------------------------------------------------------
        Preloader.prototype.create = function () {
            this.game.state.start("Test");
        };
        return Preloader;
    })(Phaser.State);
    SpriterExample.Preloader = Preloader;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Test = (function (_super) {
        __extends(Test, _super);
        // -------------------------------------------------------------------------
        function Test() {
            _super.call(this);
        }
        // -------------------------------------------------------------------------
        Test.prototype.create = function () {
            this.stage.backgroundColor = 0x00DFFF;
            var spriterLoader = new Spriter.Loader();
            var spriterData = spriterLoader.load(this.cache.getXML("HeroData"));
            this.spriterGroup = new Spriter.SpriterGroup(this.game, spriterData, "Hero", "Player", 0, 100);
            this.spriterGroup.position.setTo(320, 350);
            this.world.add(this.spriterGroup);
            // cycle animations
            var animation = 0;
            var key = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            key.onDown.add(function () {
                animation = (animation + 1) % this.spriterGroup.animationCount;
                this.spriterGroup.setAnimationById(animation);
            }, this);
        };
        // -------------------------------------------------------------------------
        Test.prototype.update = function () {
            this.spriterGroup.updateAnimation();
        };
        // -------------------------------------------------------------------------
        Test.prototype.render = function () {
            this.game.debug.text(" Playing animation: " + this.spriterGroup.currentAnimationName + " (Press A to next...)", 50, 30, "rgb(0, 0, 0)");
        };
        return Test;
    })(Phaser.State);
    SpriterExample.Test = Test;
})(SpriterExample || (SpriterExample = {}));
var SpriterExample;
(function (SpriterExample) {
    var Global = (function () {
        function Global() {
        }
        // game derived from Phaser.Game
        Global.game = null;
        // game size
        Global.GAME_WIDTH = 640;
        Global.GAME_HEIGHT = 400;
        // assets path
        Global.assetsPath = "assets/";
        return Global;
    })();
    SpriterExample.Global = Global;
})(SpriterExample || (SpriterExample = {}));
var PhaserGlobal = {
    stopFocus: true
};
// -------------------------------------------------------------------------
window.onload = function () {
    SpriterExample.Global.game = new SpriterExample.Game();
};
var SpriterExample;
(function (SpriterExample) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // -------------------------------------------------------------------------
        function Game() {
            Game.game = this;
            // init game
            _super.call(this, SpriterExample.Global.GAME_WIDTH, SpriterExample.Global.GAME_HEIGHT, Phaser.AUTO, "content", null /* , transparent, antialias, physicsConfig */);
            // states
            this.state.add("Boot", SpriterExample.Boot);
            this.state.add("Preloader", SpriterExample.Preloader);
            this.state.add("Test", SpriterExample.Test);
            // start
            this.state.start("Boot");
        }
        return Game;
    })(Phaser.Game);
    SpriterExample.Game = Game;
})(SpriterExample || (SpriterExample = {}));
