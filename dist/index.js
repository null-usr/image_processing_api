"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var app = express_1.default();
var port = 3000;
//load our router object with the root of api
app.use('/api', index_1.default);
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
exports.default = app;
