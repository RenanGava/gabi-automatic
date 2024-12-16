"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const file_1 = require("./src/routes/file");
const auth_1 = require("./src/routes/auth");
const dotenv_1 = require("dotenv");
const messages_1 = require("./src/routes/messages");
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//file routes
app.use("/file", file_1.fileRouter);
// auth routes
app.use("/auth", auth_1.AuthRouter);
// WaWeb routes
app.use("/wweb", messages_1.menssageRoute);
app.listen(3000, () => {
    console.log(`Server Is Running Port: ${3000}`);
});
