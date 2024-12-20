"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wweb = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const wweb = new whatsapp_web_js_1.Client({
    puppeteer: {
        args: ['--no-sandbox', /*'--disable-setuid-sandbox'*/],
    }
});
exports.wweb = wweb;
