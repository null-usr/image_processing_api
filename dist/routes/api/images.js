"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var img_1 = require("../../util/img");
var img_2 = require("../../util/img");
var img_3 = require("../../util/img");
var img_4 = require("../../util/img");
//https://www.npmjs.com/package/sharp
var images = express_1.default.Router();
//create get endpoint for api/images
images.get('/', function (req, res) {
    //we reach the route with no query strings
    if (Object.keys(req.query).length === 0) {
        res.status(200).send('Images route, please add your desired width and height as query parameters!');
    }
    else {
        try {
            var width_s = req.query.width;
            var width_1 = parseInt(width_s);
            var height_s = req.query.height;
            var height_1 = parseInt(height_s);
            //validate the input
            if (isNaN(width_1) || isNaN(height_1)) {
                throw 'Either the given Width or Height is not a number!';
            }
            //get the filename and extension, if no extension in the parameter, assume jpg
            var filename_1 = req.query.filename;
            if (filename_1 === undefined || filename_1 === '') {
                throw 'Filename is undefined!';
            }
            //if no file extention is provided, assume jpg
            var ext = filename_1.split('.');
            if (ext.length == 1) {
                filename_1 = filename_1.concat('.jpg');
            }
            //serve image to user
            //the thumbnail already exists, no need to resize, just load and serve it
            if (img_2.checkFSForThumbImage(filename_1, width_1, height_1)) {
                var resized_image = img_3.loadImage(img_4.thumbnailPath(filename_1, width_1, height_1));
                resized_image.pipe(res).status(200);
            }
            else {
                img_1.resizeImage(filename_1, width_1, height_1)
                    .then(function () {
                    var resized_image = img_3.loadImage(img_4.thumbnailPath(filename_1, width_1, height_1));
                    resized_image.pipe(res).status(200);
                })
                    .catch(function (error) {
                    res.status(400).send("threw " + error + " using filename: " + filename_1);
                    return;
                })
                    .finally();
                // resized_image.toBuffer().then( image => {
                // 	res.send(image);
                // 	//resized_image.pipe(res);
                // 	}
                // );
                //serve to user
            }
            //res.send(`Request to resize the ${filename} image to width: ${width}  height: ${height} has been received!`);
        }
        catch (error) {
            res.status(400).send("threw an error using width of: " + req.query.width + "  and height of: " + req.query.height + " : " + error);
        }
    }
});
exports.default = images;
