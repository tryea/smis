import { Component, OnInit } from '@angular/core';
import { SmisService } from '../services/smis.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-requestproduct',
  templateUrl: './requestproduct.page.html',
  styleUrls: ['./requestproduct.page.scss'],
})
export class RequestproductPage implements OnInit {
  infoRequest = { "productDetailName": "", "officeFrom": "", "officeTo": "" };
  responseData: any;
  branch: any;
  branchList: any;
  constructor(private smisservice: SmisService, private navCtrl: NavController) { }

  ngOnInit() {
    this.getBranchName();
  }

  getBranchName() {
    this.smisservice.getData('branchlist.php').subscribe(data => {

      this.responseData = data;
      this.branch = this.responseData;
      this.branchList = this.branch.records;
      console.log(this.branchList);

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
  }

  inputRequest() {
    console.log(this.infoRequest);
    localStorage.getItem('loginInfo');
    var loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    console.log(loginInfo.officeId);
    this.infoRequest.officeFrom = loginInfo.officeId;
    
    this.smisservice.postData('sendrequest.php', this.infoRequest).subscribe(data => {

      this.responseData = data;
      console.log(this.responseData);
      this.navCtrl.navigateForward('/home');

    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });

  }

}
