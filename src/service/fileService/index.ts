import {
  PDFExtract,
  PDFExtractOptions,
  PDFExtractResult,
} from "pdf.js-extract";

export class FileService {

  private pdfExtract: PDFExtract;
  private options: PDFExtractOptions;
  private patternsToRemove: RegExp[];
  private  timeArrival: string

  constructor() {
    this.pdfExtract = new PDFExtract();
    this.options = {};
    this.patternsToRemove = [
      /^LISTA DE PASSAGEIROS AGENDADOS$/,
      /^Impresso em: \d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/,
      /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/,
      /^[A-Z\s]+ - [A-Z0-9-]+ [A-Z0-9-]+/g,
      /^[A-ZÀ-Ú\s]+ - [A-Z0-9-]+ [A-Z0-9-]+/g,
      /^Saída:$/,
      /^Veículo:$/,
      /^Motorista: \d+ - [A-Z\s]+$/,
      /^Destino: [A-Z\s]+/g,
      /^(EMBARQUE|DESEMBARQUE|VOLTA|IDA|PA|PACIENTE|HORÁRIO|TELEFONE|TIPO|Prof\. Acomp\.:)$/,
      /^ID Viagem:$/,
      /\bVolta\b/g,
      /\bIda e\b/g,
      /Página \d+ de \d+/g,
      /RG System - Tecnologia em Software/g,
      /^\d{5}$/, // ID Viagem específico como 19927
    ];
  }

  async extractPDFData(pathFile: string) {
    if (pathFile !== "") {
      const result = await this.pdfExtract.extract(pathFile, this.options);
      const pdfData = await this.formatPdfData(result);
      return {pdfData, timeArrival: this.timeArrival};
    }
    return;
  }

  private async removeLinePatterns(pdfPage: PDFExtractResult) {
    const result = pdfPage.pages.map((page) => {
      return page.content.filter((line) => {
        if(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/.test(line.str)){
          this.timeArrival = line.str
        }
        return !this.patternsToRemove.some((pattern) => pattern.test(line.str));
      });
    });
    
    const filterArray = Array.from(result.flat()).map((row) =>
      row.str.trim()
    );

    return this.removeWhiteSpaces(filterArray);
  }

  private async formatPdfData(pdfData: PDFExtractResult) {
    if (pdfData) {
      const dataParser = this.removeLinePatterns(pdfData);

      return dataParser;
    }
  }

  private removeWhiteSpaces(data: string[]) {
    const removedWhiteSpace = data.filter((line) => line !== "");

    return removedWhiteSpace;
  }
}
