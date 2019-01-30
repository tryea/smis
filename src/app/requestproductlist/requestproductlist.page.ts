import { Component, OnInit } from '@angular/core';
import { SmisService } from '../services/smis.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-requestproductlist',
  templateUrl: './requestproductlist.page.html',
  styleUrls: ['./requestproductlist.page.scss'],
})
export class RequestproductlistPage implements OnInit {
  responseData: any;
  request: any;
  requestList: any;
  constructor(private smisservice: SmisService, private navCtrl: NavController) { }

  ngOnInit() {
    this.getRequestList();
  }
  
  getRequestList() {
    localStorage.getItem('loginInfo');
    var loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    console.log(loginInfo.branchId);
    var id = loginInfo.branchId;
    var path = "requestlist.php?id=" + id;
    this.smisservice.getData(path).subscribe(data => {

      this.responseData = data;
      this.request = this.responseData;
      this.requestList = this.request.records;
      console.log(this.requestList);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
  }

}
