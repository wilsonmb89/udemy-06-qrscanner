import { Injectable } from '@angular/core';
import { Registro } from '../utils/models/registro.model';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(
    private _file: File
  ) { }

  async generarCSV(registros: Registro[]) {
    const csvArray = [];
    csvArray.push('Tipo,Formato,Creado en,Texto\n');
    registros.forEach(
      reg => {
        csvArray.push(`${reg.type},${reg.format},${reg.created},${reg.text.replace(',', ' ')}\n`);
      }
    );
    return await this.generateCSVFile(csvArray.join(''));
  }

  private generateCSVFile(csvData: string) {
    return this._file.checkFile(this._file.dataDirectory, 'history_qrscanner.csv')
    .then(
      existe => {
        return this.writeFile(csvData);
      }
    )
    .catch(
      error => {
        return this._file.createFile(this._file.dataDirectory, 'history_qrscanner.csv', false)
          .then(
            fileCreado => {
              return this.writeFile(csvData);
            }
          )
          .catch(
            errorCreate => {
              console.error('Error generateCSVFile:', JSON.stringify(errorCreate));
              return null;
            }
          );
      }
    );
  }

  private async writeFile(csvData: string) {
    await this._file.writeExistingFile(this._file.dataDirectory, 'history_qrscanner.csv', csvData);
    return `${this._file.dataDirectory}history_qrscanner.csv`;
  }
}
