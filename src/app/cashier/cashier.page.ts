import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { SmisService } from '../services/smis.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


import { File, IWriteOptions } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

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
  loading: any;
  pdfObj = null;

  constructor(private barcodeScanner: BarcodeScanner, private smisservice: SmisService, private navCtrl: NavController, 
    private file: File, private plt: Platform,
    public loadingCtrl: LoadingController, private fileOpener: FileOpener) { }

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

  async presentLoading(msg) {
    const loading = await this.loadingCtrl.create({
      message: msg
    });
    return await loading.present();
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
        var currentItem = { "productDetailName": "", "price": "", "quantity": 0, "total": 0 };
        currentItem.productDetailName = this.productDetailInfo[0].productDetailName;
        let price = this.productDetailInfo[0].price;
        currentItem.price = price;
        let q = this.quantity;
        currentItem.quantity = q;
        currentItem.total = q * parseInt(price);
        console.log(currentItem);
        this.order.push(currentItem);
        console.log(this.order);
        console.log(this.order.length);


      }, (err: HttpErrorResponse) => {
        console.log(err.error);
        this.responseData = err.error;
        alert(this.responseData.message);
      });
    }
  }

  generateRecipe() {
    var docDefinition = {
      content: [
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['Product Name', 'Quantity', 'price per pcs', 'Total Price ']
            ]
          }
        }
      ]
    };

    // docDefinition['content'][0].table.body.push(['abc', 'def', '2', '5']);
    var i;
    var arrLength = this.order.length;
    for (i = 0; i < arrLength ; i++){
      var first = this.order[i].productDetailName;
      var second = this.order[i].quantity;
      //var third = '0';
      var third = this.order[i].price;
      var forth = this.order[i].total;

      docDefinition['content'][0].table.body.push([first , second, third, forth]);
    }
    

    this.pdfObj = pdfMake.createPdf(docDefinition);
    this.downloadPdf();
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

}
