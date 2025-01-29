import { wweb } from "../wwebService";

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
    try {
      const connectPhoneNumber = this.formateNumberPhone(phoneNumber);
      await wweb.initialize();
      const code = await wweb.requestPairingCode(connectPhoneNumber);
      
      return code;
    } catch (error) {
      throw new Error('Error on Conect WWEB')
    }
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
    return `
    📢 Aviso Importante Olá, ${name}! Detalhes do seu transporte: 
    🗺️ *Partida*: ${start} (${obs})
    🚗 *Destino*: ${end}.
    ⏰ *Horário de Saída*: ${timeStart}.
    Favor confirmar o uso do transporte com *OK*, Obrigado!
    `;
  }

  public async makeMessage(pacients: IPacientes[], timesArrival?: string) {
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
          timeEnd: pacient.time, // horario do atendimento do paciente
          timeStart: timesArrival, // horario de saida
        }).toString(),
      });
    }

    return menssages;
  }

  public async SendMessage(pacients: ISendPacient[]) {
    const finished = [];

    for (const pacient of pacients) {
      const sended = await this.wwebSendMessage(pacient);

      finished.push(sended);
    }

    return finished.length === pacients.length && true;
  }

  private async wwebSendMessage(pacient: ISendPacient) {
    if (pacient.phoneNumber != "") {
      try {
        const sended = await wweb.sendMessage(
          pacient.phoneNumber,
          pacient.message
        );

        return "teste";
      } catch (error) {
        throw new Error("Missing Message");
      }
    }
  }
}
