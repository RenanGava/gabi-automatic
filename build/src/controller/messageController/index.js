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
exports.MenssageController = void 0;
const MessageService_1 = require("../../service/MessageService");
class MenssageController {
    handleConect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber } = req.body;
            const menssageService = new MessageService_1.MenssageService();
            const codeConection = yield menssageService.initService(phoneNumber);
            res.status(200).json({
                code: codeConection,
            });
            return;
        });
    }
    handleMakeMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let pacients = req.body.pacients;
            const menssageService = new MessageService_1.MenssageService();
            const menssages = yield menssageService.makeMessage(pacients);
            res.json(menssages);
        });
    }
    handleSendMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { pacients } = req.body;
            const menssageService = new MessageService_1.MenssageService();
            const sended = yield menssageService.SendMessage(pacients);
            res.json({ sended: sended });
        });
    }
}
exports.MenssageController = MenssageController;
