import { Injectable } from '@angular/core';
import { Registro } from '../utils/models/registro.model';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(
    private _storage: Storage,
    private _router: Router,
    private _inAppBrowser: InAppBrowser
  ) { }

  async getRegistros() {
    const regResults = await this._storage.get('scanbarcode_history');
    return regResults || [];
  }

  async saveRegistro(format: string, text: string) {
    const newRegistro = new Registro(format, text);
    const registrosSaved = await this.getRegistros();
    registrosSaved.splice(0, 0, newRegistro);
    await this._storage.set('scanbarcode_history', registrosSaved);
    this.abrirRegistro(newRegistro);
  }

  async clearHistory() {
    await this._storage.clear();
  }

  abrirRegistro(registro: Registro) {
    switch (registro.type) {
      case 'http':
        this._router.navigate(['/tabs/tab2']);
        this._inAppBrowser.create(`${registro.text}`, '_system');
        break;
      case 'geo':
        this._router.navigate([`/tabs/tab2/mapa/${registro.text}`]);
        break;
      default:
        break;
    }
  }
}
