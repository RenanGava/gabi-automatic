"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menssageRoute = void 0;
const express_1 = require("express");
const messageController_1 = require("../../controller/messageController");
const menssageRoute = (0, express_1.Router)();
exports.menssageRoute = menssageRoute;
menssageRoute.get("/send/wahtsapp", new messageController_1.MenssageController().handle);
