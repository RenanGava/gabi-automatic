"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menssageRoute = void 0;
const express_1 = require("express");
const messageController_1 = require("../../controller/messageController");
const passport_1 = require("../../middleware/passport");
const menssageRoute = (0, express_1.Router)();
exports.menssageRoute = menssageRoute;
menssageRoute.get("/conect/wahtsapp", passport_1.passport.authenticate("jwt", { session: false }), new messageController_1.MenssageController().handleConect);
menssageRoute.get("/make/wahtsapp", passport_1.passport.authenticate("jwt", { session: false }), new messageController_1.MenssageController().handleMakeMessages);
menssageRoute.get("/send/wahtsapp", passport_1.passport.authenticate("jwt", { session: false }), new messageController_1.MenssageController().handleSendMessages);