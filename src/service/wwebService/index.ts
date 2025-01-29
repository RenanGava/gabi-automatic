import { Client, LocalAuth } from "whatsapp-web.js";
import * as path from 'path';

// Resolve o caminho absoluto do executável Chromium
// const chromiumPath: string = path.resolve(__dirname, '/usr/bin/chromium');


const wweb = new Client({
    puppeteer: {
        args:  ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
        // executablePath: chromiumPath
    },
})


export { wweb }