import { Component, OnInit } from '@angular/core';
import { SmisService } from '../services/smis.service';
import { NavController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  category: any;
  categoryList : any;
  responseData: any;
  infoProduct = {"productName":"", "categoryId":""};

  constructor(private smisservice: SmisService, private navCtrl: NavController) { }

  ngOnInit() {
    this.smisservice.getData('categorylist.php').subscribe(data => {

      this.responseData = data;
      this.category = this.responseData;
      this.categoryList = this.category.records;
      console.log(this.categoryList);
      
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });

  }

  addProduct(){
    console.log(this.infoProduct);
    this.smisservice.postData('addproduct.php', this.infoProduct).subscribe(data => {

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
