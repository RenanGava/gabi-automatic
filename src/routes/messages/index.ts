import { Router } from "express";
import { MenssageController } from "../../controller/messageController";


const menssageRoute = Router();

menssageRoute.get("/conect/wahtsapp", new MenssageController().handle);

export { menssageRoute };
