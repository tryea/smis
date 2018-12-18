import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SmisService } from '../services/smis.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.page.html',
  styleUrls: ['./cashier.page.scss'],
})
export class CashierPage implements OnInit {
  order = [];
  responseData: any;
  productDetailInfo: any;
  scannedCode: any;
  quantity: any;
  constructor(private barcodeScanner: BarcodeScanner, private smisservice: SmisService, private navCtrl: NavController) { }

  ngOnInit() {

  }
  displayOrderProduct() {

  }
  addProductOrder() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.getProductInfo(this.scannedCode);
    }, (err) => {
      alert('Error: ' + err);
      console.log('Error: ', err);
    });
  }

  getProductInfo(productId) {
    console.log(this.quantity);
    if (this.quantity !== undefined && this.quantity !== null) {
      const path = 'getproductinfo.php?id=' + productId;
      console.log(path);
      this.smisservice.getData(path).subscribe(data => {

        this.responseData = data;
        console.log(this.responseData);
        this.productDetailInfo = this.responseData.records;
        console.log(this.productDetailInfo);
        var currentItem = { "productDetailName": "", "price": "", "quantity": 0 , "total": 0  };
        currentItem.productDetailName = this.productDetailInfo[0].productDetailName;
        let price = this.productDetailInfo[0].price;
        currentItem.price = price;
        let q = this.quantity;
        currentItem.quantity = q;
        currentItem.total = q * parseInt(price);
        console.log(currentItem);
        this.order.push(currentItem);


      }, (err: HttpErrorResponse) => {
        console.log(err.error);
        this.responseData = err.error;
        alert(this.responseData.message);
      });
    }
  }

  generateRecipe() {
    
  }

}
