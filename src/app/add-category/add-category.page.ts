import { Component, OnInit } from '@angular/core';
import { SmisService } from '../services/smis.service';
import { NavController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {

  infoCategory = { "categoryName": "" };
  responseData: any;
  statusLogin: any;
  constructor(private smisservice: SmisService, private navCtrl: NavController) { }

  ngOnInit() {
  }

  addCategory(){
    console.log(this.infoCategory);
    this.smisservice.postData('addcategory.php', this.infoCategory).subscribe(data => {

      this.responseData = data;
      console.log(this.responseData.status);
      this.statusLogin = this.responseData.message;
      console.log(this.statusLogin);
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
