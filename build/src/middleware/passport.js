"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passport = void 0;
const passport_1 = require("passport");
const PassportLocal_1 = require("../Config/Passport/PassportLocal");
const PassportJWT_1 = require("../Config/Passport/PassportJWT");
const passport = new passport_1.Passport();
exports.passport = passport;
// metodo login para gerar jwt
passport.use(PassportLocal_1.configPassPortLocal);
// metodo jwt
passport.use(PassportJWT_1.configPassPortJWT);
