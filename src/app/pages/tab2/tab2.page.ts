import { Component, Input } from '@angular/core';
import { DataLocalService } from 'src/app/services/data-local.service';
import { Registro } from 'src/app/utils/models/registro.model';
import { DocumentsService } from 'src/app/services/documents.service';
import { MailService } from 'src/app/services/mail.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page  {

  @Input() newRegistro: Registro;

  historialReg: Registro[] = [];

  constructor(
    private _dataLocalService: DataLocalService,
    private _documentsService: DocumentsService,
    private _mailService: MailService
  ) { }

  ionViewWillEnter() {
    this.getHistory();
  }

  async sendMail() {
    this.getHistory();
    const dataCSV = await this._documentsService.generarCSV(this.historialReg);
    this._mailService.enviarCorreo([dataCSV]);
  }

  async getHistory() {
    this.historialReg = await this._dataLocalService.getRegistros();
  }

  openRegistro(registro: Registro) {
    this._dataLocalService.abrirRegistro(registro);
  }

  clearHistory() {
    this._dataLocalService.clearHistory();
    this.getHistory();
  }
}
