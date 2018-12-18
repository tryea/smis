import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SmisService } from '../services/smis.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-updatestock',
  templateUrl: './updatestock.page.html',
  styleUrls: ['./updatestock.page.scss'],
})
export class UpdatestockPage implements OnInit {
  scannedCode: any;
  responseData: any;
  productDetailInfo: any;
  // tslint:disable-next-line:quotemark
  input = { "stock": "", "productDetailId" : "" };
  constructor(private barcodeScanner: BarcodeScanner, private smisservice: SmisService, private navCtrl: NavController ) { }

  ngOnInit() {
    this.scanCode();
    // this.scannedCode = '32';
     // this.getProductInfo(32);
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.getProductInfo(this.scannedCode);
    }, (err) => {
      alert('Error: ' + err);
      console.log('Error: ', err);
    });
  }

  getProductInfo(productId) {
    const path = 'getproductinfo.php?id=' + productId;
    console.log(path);
    this.smisservice.getData(path).subscribe(data => {

      this.responseData = data;
      console.log(this.responseData);
      this.productDetailInfo = this.responseData.records;
      console.log(this.productDetailInfo);
      console.log(this.productDetailInfo[0].size);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });

  }

  updateStock() {
    this.input.productDetailId = this.productDetailInfo[0].productDetailId;
    this.smisservice.postData('updatestock.php', this.input).subscribe(data => {

      this.responseData = data;
      alert(this.responseData.message);
      this.navCtrl.navigateForward('/home');
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
  }

}
