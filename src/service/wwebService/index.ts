import { Client } from "whatsapp-web.js";


const wweb = new Client({
    puppeteer: {
        args:  ['--no-sandbox', /*'--disable-setuid-sandbox'*/],
    }
})


export { wweb }