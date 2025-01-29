interface IPacientsPA {
  time: string;
  tel: string;
  name: string;
  cpf: string;
  obs: string;
  start: string;
  end: string;
  situation: string;
}

export class MatrizService {
  private MatrizFormated: Array<IPacientsPA> = [];

  async turnIntoMatriz(list: string[]) {
    
    var lineMatriz: string[] = [];
    for (let i = 0; i < list.length; i++) {
      const line = this.validateString(list[i]);

      if (line !== undefined) {
        lineMatriz.push(line);
      }

      if (line === "P" || line === "A") {
        // aqui removemos itens duplicados
        lineMatriz = [...new Set(lineMatriz)];

        const lineMatrizFormatted = this.patterningMatriz(lineMatriz);
        const turnInObject = this.turnArrayInObject(lineMatrizFormatted);

        this.MatrizFormated.push(turnInObject);
        // console.log(turnInObject);

        lineMatriz = [];
      }
    }
    return this.MatrizFormated;
  }

  private validateString(line: string) {
    if (line.match(/\b([01]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?\b/g)) {
      return line
        .match(/\b([01]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?\b/g)
        .toLocaleString();
    } else if (
      line.match(/\b([01]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?\b/g)
    ) {
      return line
        .match(/\b([01]?[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?\b/g)
        .toLocaleString();
    } else if (line.match(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g)) {
      return line.match(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g).toLocaleString();
    }
    //
    else if (line.match(/\(\d{2}\) \d{5}-\d{4}/g)) {
      return line.match(/\(\d{2}\) \d{5}-\d{4}/g).toLocaleString();
    } else if (line.match(/\b\d{15}\b/g)) {
      return undefined;
    }

    return line;
  }

  private patterningMatriz(array: string[]) {
    if (/OBS:\s(?:[^\s,]+(?:\s|,|\.|$))+/g.test(array.toString())) {
      if (array.length < 8) {
        if (!array[0].match(/\b\d{2}:\d{2}\b/g)) {
          array.splice(0, 0, "??:??");
        }
        if (!array[3].match(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g)) {
          array.splice(3, 0, "000.000.000-00");
        }
      }
      if (array.length == 8) {
        array.splice(5, 0, " ");
      }
      if (array.length == 9) {
        array.splice(array.length - 1, 0, " ");
      }
    } else {
      array.splice(4, 0, "OBS: N/A");

      if (array.length < 8) {
        if (!array[0].match(/\b\d{2}:\d{2}\b/g)) {
          array.splice(0, 0, "??:??");
        }
        if (!array[3].match(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/g)) {
          array.splice(3, 0, "000.000.000-00");
        }
      }
      if (array.length == 8) {
        array.splice(5, 0, " ");
      }
      if (array.length == 9) {
        array.splice(array.length - 1, 0, " ");
      }
    }
    return array;
  }

  private turnArrayInObject(array: string[]) {
    if (array[5] === " " && array[8] === " ") {
      return {
        time: array[0],
        tel: array[1],
        name: array[2],
        cpf: array[3],
        obs: array[4],
        start: array[6],
        end: array[7],
        situation: array[9],
      };
    }

    if (array[5] !== " " && array[8] === " ") {
      return {
        time: array[0],
        tel: array[1],
        name: array[2],
        cpf: array[3],
        obs: array[4],
        start: array[5],
        end: "".concat(array[6], " ", array[7]),
        situation: array[9],
      };
    }

    return {
      time: array[0],
      tel: array[1],
      name: array[2],
      cpf: array[3],
      obs: "".concat(array[4], " ", array[5]),
      start: array[6],
      end: "".concat(array[7], " ", array[8]),
      situation: array[9],
    };
  }
}

// [ undefined, { position: 5 }, { position: 8 } ]
// [ undefined, { position: 5 }, { position: 8 } ]
// [ undefined, { position: 5 }, { position: 8 } ]
// [ undefined, { position: 5 }, { position: 8 } ]
// [ undefined, { position: 5 }, { position: 8 } ]
// [ undefined, { position: 5 }, { position: 8 } ]
// [ undefined, { position: 5 }, { position: 8 } ]
// [ undefined, { position: 5 }, { position: 8 } ]
