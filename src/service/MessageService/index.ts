import { finished } from "stream";
import { wweb } from "../wwebService";
import { setTimeout } from 'timers/promises'
import { send } from "process";

interface IMessageTemplate {
  name: string;
  timeStart: string;
  timeEnd: string;
  obs: string;
  start: string;
  end: string;
}

interface IMakeMessageTemplate {
  phoneNumber: string;
  message: string;
}

interface IPacientes {
  time: string;
  tel: string;
  name: string;
  cpf: string;
  obs: string;
  start: string;
  end: string;
  situation: string;
}

interface ISendPacient {
  phoneNumber: string;
  message: string;
}

export class MenssageService {
  public async initService(phoneNumber: string): Promise<string> {
    const connectPhoneNumber = this.formateNumberPhone(phoneNumber);
    await wweb.initialize();
    const code = await wweb.requestPairingCode(connectPhoneNumber);
    return code;
  }

  private formateNumberPhone(phoneNumber: string) {
    const formated = "55" + phoneNumber.replace(/[()\s\-]/g, "");
    return formated;
  }

  public templateMessage({
    name,
    timeStart,
    timeEnd,
    obs,
    start,
    end,
  }: IMessageTemplate) {
    return `📢 Aviso Importante

      Olá, ${name}!

      Gostaríamos de informar os detalhes do seu transporte:

      🗺️ Local de Partida: ${start}.
      📍 Ponto de Referência: ${obs}.
      🚗 Local de Chegada: ${end}.

      ⏰ Horário: ${timeEnd}.

      Por favor, esteja no local de partida com 10 min de antecedência para evitar atrasos.

      Agradecemos sua atenção!`
  }

  public async makeMessage(pacients: IPacientes[]) {
    const menssages: IMakeMessageTemplate[] = [];

    for await (const pacient of pacients) {
      let formatNumber = this.formateNumberPhone(pacient.tel);
      menssages.push({
        phoneNumber: `${formatNumber}@c.us`,
        message: this.templateMessage({
          name: pacient.name,
          obs: pacient.obs,
          start: pacient.start,
          end: pacient.end,
          timeEnd: pacient.time,
          timeStart: pacient.time,
        }).toString(),
      });
    }

    return menssages;
  }

  public async SendMessage(pacients: ISendPacient[]) {
    const finished = []
    
    for (const pacient of pacients) {

      console.log("Telefone->", pacient.phoneNumber);
      console.log("Menssagem->", pacient.message);
      const sended = await this.wwebSendMessage(pacient)

      finished.push(sended)
    }

    return finished.length === pacients.length && (true);
  }


  private async wwebSendMessage(pacient: ISendPacient){
    console.log("Telefone->", pacient.phoneNumber);
    console.log("Menssagem->", pacient.message);
    
    if (pacient.phoneNumber != "") {
      const sended = await wweb.sendMessage(pacient.phoneNumber, pacient.message);
      return 'teste' 
    }
  }
}
