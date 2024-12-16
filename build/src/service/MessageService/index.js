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
exports.MenssageService = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
class MenssageService {
    constructor() {
        this.wClient = new whatsapp_web_js_1.Client({
            puppeteer: {
                args: ['--no-sandbox', /*'--disable-setuid-sandbox'*/],
            }
        });
    }
    initService(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const formatedPhoneNumber = phoneNumber.replace(/[()\-\s]/g, '');
            const connectPhoneNumber = `55${formatedPhoneNumber}`;
            this.wClient.on('ready', () => {
                console.log('Esta Pronto');
            });
            this.wClient.on('qr', (qr) => __awaiter(this, void 0, void 0, function* () {
                yield this.wClient.requestPairingCode(connectPhoneNumber);
            }));
            this.wClient.initialize();
        });
    }
}
exports.MenssageService = MenssageService;
