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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const fileService_1 = require("../../service/fileService");
const MatrizService_1 = require("../../service/MatrizService");
const path_1 = require("path");
class FileController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = req.file.filename;
            const fileService = new fileService_1.FileService();
            const matriz = new MatrizService_1.MatrizService();
            const pathResolve = (0, path_1.resolve)(__dirname, '..', '..', '..');
            const result = yield fileService.extractPDFData(pathResolve + "/tmp/" + fileName);
            const resultMatriz = yield matriz.turnIntoMatriz(result);
            res.status(200).json(resultMatriz);
            return;
        });
    }
}
exports.FileController = FileController;
