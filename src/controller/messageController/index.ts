import { Request, Response } from "express";
import { MenssageService } from "../../service/MessageService";
import { wweb } from "../../service/wwebService";


interface IPacientes{
    time: string;
    tel: string;
    name: string;
    cpf: string;
    obs: string;
    start: string;
    end: string;
    situation: string;
}

interface IMessageTemplate{
    phoneNumber: string;
    message: string
}


export class MenssageController {
  public async handleConect(req: Request, res: Response) {
    const { phoneNumber } = req.body;
    const menssageService = new MenssageService();
    const codeConection = await menssageService.initService(phoneNumber);

    res.status(200).json({
      code: codeConection,
    });
    return;
  }

  public async handleMakeMessages(req: Request, res: Response) {
    let pacients = req.body.pacients as IPacientes[]
    const menssageService = new MenssageService();

    const menssages = await menssageService.makeMessage(pacients)

    res.json(menssages);
  }

  public async handleSendMessages(req: Request, res: Response){
    let { pacients } = req.body

    console.log(pacients);
    
    const menssageService = new MenssageService();

    const send = await menssageService.SendMessage(pacients)
    res.json({sended: true});
  }
}
