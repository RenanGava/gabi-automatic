"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileRouter = void 0;
const express_1 = require("express");
const fileController_1 = require("../../controller/fileController");
const passport_1 = require("../../middleware/passport");
const multer_1 = __importDefault(require("../../middleware/multer"));
const multer_2 = __importDefault(require("multer"));
const fileRouter = (0, express_1.Router)();
exports.fileRouter = fileRouter;
const upload = (0, multer_2.default)(multer_1.default.upload("./tmp"));
fileRouter.post("/send", passport_1.passport.authenticate("jwt", { session: false }), upload.single("file"), new fileController_1.FileController().handle);
