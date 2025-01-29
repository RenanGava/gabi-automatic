import multer from "multer";
import cuid from "cuid";


import { resolve } from "path";

export default {
    upload(folder: string){
        return {
            storage: multer.diskStorage({
                // o __dirname se refere ao diretorio em que estamos
                // cada ".." daquele volta uma pasta e o folder vamos receber pelo
                // para metro definido no método.
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    
                    
                    const fileName = `${cuid()}-${file.originalname}`

                    return callback(null, fileName)
                }
            })
        }
    }
}