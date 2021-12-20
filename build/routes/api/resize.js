"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var resizeFunctions_1 = __importDefault(require("../../utilites/resizeFunctions"));
var resize = express_1.default.Router();
var path = require('path');
// identifying our public directly to reach "image" and"output" directory when using .sendFile()
var publicDirectoryPath = path.join(__dirname, '../../../');
var imageExist = resizeFunctions_1.default.imageExist, imageAlreadyResized = resizeFunctions_1.default.imageAlreadyResized, resizeImage = resizeFunctions_1.default.resizeImage;
// our image endpoint for resizing
// eslint-disable-next-line consistent-return
resize.get('/', function (req, res) {
    var _a;
    var width = parseInt(req.query.width, 10);
    var height = parseInt(req.query.height, 10);
    var fileName = (_a = req.query.file_name) === null || _a === void 0 ? void 0 : _a.toLocaleString();
    // validating if height and width comming from the user are positive integers
    if (width <= 0 || height <= 0) {
        return res.send('Please use positive integers for width and height');
    }
    // Checking if image exist in our "images" directory and isnt alredy cached in "output" directory
    if (imageExist(fileName) === true && imageAlreadyResized(fileName, width, height) === false) {
        resizeImage(fileName, width, height)
            .then(function () {
            res.sendFile("".concat(publicDirectoryPath, "/output/new").concat(fileName, "-").concat(width, "-").concat(height, ".jpg"));
        })
            .catch(function (err) {
            console.log(err);
        });
        // If image is cached in our "outout" directory, send already processed image found in the "output" directory
    }
    else if (imageAlreadyResized(fileName, width, height)) {
        res.sendFile("".concat(publicDirectoryPath, "/output/new").concat(fileName, "-").concat(width, "-").concat(height, ".jpg"));
        // if image isnt available in our "images" directory notify the user
    }
    else if (imageExist(fileName) === false) {
        res.send('file doesnt exist in images directory');
    }
});
exports.default = resize;
