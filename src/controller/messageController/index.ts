import { Request, Response } from "express";
import { MenssageService } from "../../service/MessageService";

export class MenssageController{

    public async handle(req: Request, res: Response){
        const { phoneNumber } = req.body;
        const menssageService = new MenssageService()
        const codeConection = await menssageService.initService(phoneNumber)

        res.status(200).json({
            code: codeConection
        })
        return
    }
}