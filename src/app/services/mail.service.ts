import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(
    private _emailComposer: EmailComposer
  ) { }

  enviarCorreo(attachFiles: string[]) {
    const email = {
      to: 'wilsonmb89@hotmail.com',
      /* cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'], */
      attachments: attachFiles,
      subject: 'Backup registros scanApp',
      body: 'Archivo de registros de <strong>scanApp</strong>',
      isHtml: true
    };
    // Send a text message using default options
    this._emailComposer.open(email);
  }
}
