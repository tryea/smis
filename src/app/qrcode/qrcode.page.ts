import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
  ngxQrcode2 = 'https://www.npmjs.com/package/ngx-qrcode2';
  techiediaries = 'https://www.npmjs.com/~techiediaries';
  letsboot = 'https://www.letsboot.com/';
  qrData: any;
  createdCode: any;
  scannedCode: any;

  constructor(private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }

  createCode() {
    this.createdCode = this.qrData;
    let x = document.getElementsByClassName('qrcode');
    console.log(x);
    //console.log(x[0]);
    let v = x.item(0);
    console.log(v);
    let w = v.getElementsByTagName("img");
    console.log(w);
    let a = w.item(0);
    console.log(a)
    let b = a.src;
    console.log(b);
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
      console.log('Error: ', err);
    });
  }

}
