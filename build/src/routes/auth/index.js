"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const passport_1 = require("../../middleware/passport");
const userController_1 = require("../../controller/userController");
const AuthRouter = (0, express_1.Router)();
exports.AuthRouter = AuthRouter;
AuthRouter.get('/', passport_1.passport.authenticate('local', { session: false }), (req, res) => {
    res.json(req.user);
    return;
});
AuthRouter.post("/create/user", new userController_1.UserController().createController);
