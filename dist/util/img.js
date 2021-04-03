"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkFSForThumbImage = exports.resizeImage = exports.thumbnailPath = exports.loadImage = exports.fullsizePath = void 0;
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var process_1 = __importDefault(require("process"));
//import { promises as fsPromises } from 'fs'
var fs_1 = __importDefault(require("fs"));
var fullsizePath = function (filename) {
    return path_1.default.join(process_1.default.cwd(), 'assets', 'full', filename);
};
exports.fullsizePath = fullsizePath;
var loadImage = function (filename) {
    var image = sharp_1.default(filename);
    return image;
};
exports.loadImage = loadImage;
var thumbnailPath = function (filename, width, height) {
    var name_and_ext = filename.split('.');
    var name = name_and_ext[0];
    var ext = name_and_ext[1];
    var format = name.concat('_', width.toString(), 'x', height.toString(), '.', ext);
    return path_1.default.join(process_1.default.cwd(), 'assets', 'thumb', format);
};
exports.thumbnailPath = thumbnailPath;
//use sharp to resize image if possible and return a promise
//parameters: filename, width and height
var resizeImage = function (filename, width, height) {
    var fullsize = exports.loadImage(exports.fullsizePath(filename));
    var outputPath = exports.thumbnailPath(filename, width, height);
    //const image = sharp(fullsize);
    var output = fullsize.resize(width, height);
    //.toBuffer() //this presumably returns a promise
    //.then( data => {  })
    //.catch( err => {  });
    //toFile();
    return output.toFile(outputPath);
};
exports.resizeImage = resizeImage;
//check to see if we already have this image & dimension
//should return a bool if the file exists
var checkFSForThumbImage = function (filename, width, height) {
    var thumbPath = exports.thumbnailPath(filename, width, height);
    try {
        if (fs_1.default.existsSync(thumbPath)) {
            return true;
        }
    }
    catch (err) {
        return false;
    }
    return false;
};
exports.checkFSForThumbImage = checkFSForThumbImage;
