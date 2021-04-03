"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var process_1 = __importDefault(require("process"));
var fs_1 = __importDefault(require("fs"));
var img_1 = require("../../util/img");
var img_2 = require("../../util/img");
var img_3 = require("../../util/img");
var img_4 = require("../../util/img");
var img_5 = require("../../util/img");
//not exactly how to make the path tests universal...
describe('Test Image Processing Helper Results', function () {
    it('finds the fullsize test image path', function () {
        expect(img_4.fullsizePath('test.jpg')).toBe(path_1.default.join(process_1.default.cwd(), 'assets', "full", 'test.jpg'));
    });
    it('finds the thumbnail test image path', function () {
        expect(img_5.thumbnailPath('test.jpg', 100, 100)).toBe(path_1.default.join(process_1.default.cwd(), 'assets', "thumb", 'test_100x100.jpg'));
    });
    it('finds the thumbnail image in the file system', function () {
        expect(img_2.checkFSForThumbImage('test.jpg', 200, 200)).toBe(true);
    });
});
//here we want to create an image and check info, then after all delete the image
describe('Test Image Processing Results', function () {
    var width = 100;
    var height = 100;
    //delete resized images
    afterAll(function () {
        try {
            fs_1.default.unlinkSync(img_5.thumbnailPath('test.jpg', 100, 100));
        }
        catch (err) {
            console.error(err);
        }
    });
    //.toBeResolved() doesn't seem to be available
    it('loads the test image', function () {
        return __awaiter(this, void 0, void 0, function () {
            var test_img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        test_img = img_3.loadImage(img_4.fullsizePath('test.jpg'));
                        return [4 /*yield*/, test_img.metadata().then(function (metadata) {
                                expect(metadata).toBeTruthy();
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it('creates a 100x100 image', function () {
        img_1.resizeImage('test.jpg', 100, 100).then(function (outputInfo) {
            var result = outputInfo.width == width && outputInfo.height == height;
            expect(result).toBe(true);
        });
    });
    it('finds loads the thumbnail image', function () {
        var test_img = img_3.loadImage(img_5.thumbnailPath('test.jpg', width, height));
        test_img.metadata().then(function (metadata) {
            var result = metadata.width == width && metadata.height == height;
            expect(result).toBe(true);
        });
    });
});
