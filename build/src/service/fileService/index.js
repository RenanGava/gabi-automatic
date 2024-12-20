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
exports.FileService = void 0;
const pdf_js_extract_1 = require("pdf.js-extract");
class FileService {
    constructor() {
        this.pdfExtract = new pdf_js_extract_1.PDFExtract();
        this.options = {};
        this.patternsToRemove = [
            /^LISTA DE PASSAGEIROS AGENDADOS$/,
            /^Impresso em: \d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/,
            /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/,
            /^[A-Z\s]+ - [A-Z0-9-]+ [A-Z0-9-]+/g,
            /^[A-ZÀ-Ú\s]+ - [A-Z0-9-]+ [A-Z0-9-]+/g,
            /^Saída:$/,
            /^Veículo:$/,
            /^Motorista: \d+ - [A-Z\s]+$/,
            /^Destino: [A-Z\s]+/g,
            /^(EMBARQUE|DESEMBARQUE|VOLTA|IDA|PA|PACIENTE|HORÁRIO|TELEFONE|TIPO|Prof\. Acomp\.:)$/,
            /^ID Viagem:$/,
            /\bVolta\b/g,
            /\bIda e\b/g,
            /Página \d+ de \d+/g,
            /RG System - Tecnologia em Software/g,
            /^\d{5}$/, // ID Viagem específico como 19927
        ];
    }
    extractPDFData(pathFile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pathFile !== "") {
                const result = yield this.pdfExtract.extract(pathFile, this.options);
                const pdfData = yield this.formatPdfData(result);
                return pdfData;
            }
            return;
        });
    }
    removeLinePatterns(pdfPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = pdfPage.pages.map((page) => {
                return page.content.filter((line) => {
                    return !this.patternsToRemove.some((pattern) => pattern.test(line.str));
                });
            });
            const filterArray = Array.from(result.flat()).map((row) => row.str.trim());
            return this.removeWhiteSpaces(filterArray);
        });
    }
    formatPdfData(pdfData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pdfData) {
                const dataParser = this.removeLinePatterns(pdfData);
                return dataParser;
            }
        });
    }
    removeWhiteSpaces(data) {
        const removedWhiteSpace = data.filter((line) => line !== "");
        return removedWhiteSpace;
    }
}
exports.FileService = FileService;
