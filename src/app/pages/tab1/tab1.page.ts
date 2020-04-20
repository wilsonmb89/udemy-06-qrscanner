import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {

  slideOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(
    private _barcodeScanner: BarcodeScanner,
    private _dataLocalService: DataLocalService
  ) {}

  ionViewWillEnter() {
    this.scan();
  }

  scan() {
    this._barcodeScanner.scan().then(
      barcodeData => {
        if (!barcodeData.cancelled) {
          this._dataLocalService.saveRegistro(barcodeData.format, barcodeData.text);
        }
      }
     ).catch(
      err => {
        console.error('Error', JSON.stringify(err));
      }
    );
  }
}
