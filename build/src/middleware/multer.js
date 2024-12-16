"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const cuid_1 = __importDefault(require("cuid"));
const path_1 = require("path");
exports.default = {
    upload(folder) {
        return {
            storage: multer_1.default.diskStorage({
                // o __dirname se refere ao diretorio em que estamos
                // cada ".." daquele volta uma pasta e o folder vamos receber pelo
                // para metro definido no método.
                destination: (0, path_1.resolve)(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileName = `${(0, cuid_1.default)()}-${file.originalname}`;
                    return callback(null, fileName);
                }
            })
        };
    }
};
