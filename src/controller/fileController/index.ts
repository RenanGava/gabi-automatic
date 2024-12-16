import { Request, Response } from "express";
import { FileService } from "../../service/fileService";
import { MatrizService } from "../../service/MatrizService";
import { resolve } from 'path'


export class FileController {
  async handle(req: Request, res: Response) {
    const fileName = req.file.filename;
    const fileService = new FileService();
    const matriz = new MatrizService();
    const pathResolve = resolve(__dirname, '..', '..', '..')
    const result = await fileService.extractPDFData(pathResolve + "/tmp/" + fileName);
    const resultMatriz = await matriz.turnIntoMatriz(result);

    res.status(200).json(resultMatriz);
    return
  }
}
