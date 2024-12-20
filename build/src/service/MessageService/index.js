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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenssageService = void 0;
const wwebService_1 = require("../wwebService");
const promises_1 = require("timers/promises");
class MenssageService {
    initService(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const connectPhoneNumber = this.formateNumberPhone(phoneNumber);
            yield wwebService_1.wweb.initialize();
            const code = yield wwebService_1.wweb.requestPairingCode(connectPhoneNumber);
            return code;
        });
    }
    formateNumberPhone(phoneNumber) {
        const formated = "55" + phoneNumber.replace(/[()\s\-]/g, "");
        return formated;
    }
    templateMessage({ name, timeStart, timeEnd, obs, start, end, }) {
        return `📢 Aviso Importante

      Olá, ${name}!

      Gostaríamos de informar os detalhes do seu transporte:

      🗺️ Local de Partida: ${start}.
      📍 Ponto de Referência: ${obs}.
      🚗 Local de Chegada: ${end}.

      ⏰ Horário: ${timeEnd}.

      Por favor, esteja no local de partida com 10 min de antecedência para evitar atrasos.

      Agradecemos sua atenção!`;
    }
    makeMessage(pacients) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, pacients_1, pacients_1_1;
            var _b, e_1, _c, _d;
            const menssages = [];
            try {
                for (_a = true, pacients_1 = __asyncValues(pacients); pacients_1_1 = yield pacients_1.next(), _b = pacients_1_1.done, !_b; _a = true) {
                    _d = pacients_1_1.value;
                    _a = false;
                    const pacient = _d;
                    let formatNumber = this.formateNumberPhone(pacient.tel);
                    menssages.push({
                        phoneNumber: `${formatNumber}@c.us`,
                        message: this.templateMessage({
                            name: pacient.name,
                            obs: pacient.obs,
                            start: pacient.start,
                            end: pacient.end,
                            timeEnd: pacient.time,
                            timeStart: pacient.time,
                        }).toString(),
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = pacients_1.return)) yield _c.call(pacients_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return menssages;
        });
    }
    SendMessage(pacients) {
        return __awaiter(this, void 0, void 0, function* () {
            const finished = [];
            for (const pacient of pacients) {
                const sended = yield this.wwebSendMessage(pacient);
                finished.push(sended);
            }
            return finished.length === pacients.length && (true);
        });
    }
    wwebSendMessage(pacient) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pacient.phoneNumber != "") {
                (0, promises_1.setTimeout)(1000);
                const sended = yield wwebService_1.wweb.sendMessage(pacient.phoneNumber, pacient.message);
                return sended;
            }
        });
    }
}
exports.MenssageService = MenssageService;
