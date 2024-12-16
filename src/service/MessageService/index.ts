import { wweb } from "../wwebService";




export class MenssageService{

    public async initService(phoneNumber: string): Promise<string>{
        const formatedPhoneNumber = phoneNumber.replace(/[()\-\s]/g, '')
        const connectPhoneNumber = `55${formatedPhoneNumber}`
        await wweb.initialize()
        const code = await wweb.requestPairingCode(connectPhoneNumber)
        return code
    }
}