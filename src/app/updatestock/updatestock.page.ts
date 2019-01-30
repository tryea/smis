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
  input = { "stock": "", "productDetailId": "", "branchId": "", "storageNumber" : "", "price" : ""};
  constructor(private barcodeScanner: BarcodeScanner, private smisservice: SmisService, private navCtrl: NavController ) { }

  ngOnInit() {
    this.scanCode();
    // this.scannedCode = '1';
    //  this.getProductInfo(1);
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
    var loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    var branchId = loginInfo.branchId;
    const path = 'getproductinfo.php?id=' + productId + "&branch=" + branchId;
    console.log(path);
    this.smisservice.getData(path).subscribe(data => {

      this.responseData = data;
      console.log(this.responseData);
      this.productDetailInfo = this.responseData;

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });

  }

  updateStock() {
    this.input.productDetailId = this.productDetailInfo.productDetailId;
    var loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    var branchId = loginInfo.branchId;

    this.input.branchId = branchId;
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
