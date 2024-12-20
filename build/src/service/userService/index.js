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
exports.UserService = void 0;
const prisma_1 = require("../../prisma/prisma");
const bcryptjs_1 = require("bcryptjs");
class UserService {
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            const userAlreadyExists = yield prisma_1.prisma.user.findFirst({
                where: {
                    email: email
                }
            });
            if (userAlreadyExists) {
                throw new Error("User Exists");
            }
            const createUser = yield prisma_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password: (0, bcryptjs_1.hashSync)(password, 8)
                }
            });
            return createUser;
        });
    }
}
exports.UserService = UserService;
