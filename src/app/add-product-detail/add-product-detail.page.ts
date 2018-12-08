import { Component, OnInit } from '@angular/core';
import { SmisService } from '../services/smis.service';
import { NavController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-product-detail',
  templateUrl: './add-product-detail.page.html',
  styleUrls: ['./add-product-detail.page.scss'],
})
export class AddProductDetailPage implements OnInit {

  product: any;
  productList: any;
  responseData: any;
  infoProductDetail = { "producDetailtName": "", "productId": "", "colour": "", "size": "", "stock": "" };

  constructor(private smisservice: SmisService, private navCtrl: NavController) { }

  ngOnInit() {
    this.smisservice.getData('productlist.php').subscribe(data => {

      this.responseData = data;
      this.product = this.responseData;
      this.productList = this.product.records;
      console.log(this.productList);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
    
  }

  addProductDetail(){
    console.log(this.infoProductDetail);
    this.smisservice.postData('addproductdetail.php', this.infoProductDetail).subscribe(data => {

      this.responseData = data;
      console.log(this.responseData.status);
      console.log(this.responseData);
      alert(this.responseData.message);
      this.navCtrl.navigateForward('/home');
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
  }
}
