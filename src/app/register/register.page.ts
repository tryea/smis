import { Component, OnInit } from '@angular/core';
import { SmisService } from '../services/smis.service';
import { NavController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  infoRegister = { "username": "", "password": "","role": "", "branch": ""};
  responseData: any;
  statusRegister: any;
  role:any;
  roleList:any;
  constructor(private smisservice:SmisService, private navCtrl:NavController) { }

  ngOnInit() {
    this.smisservice.getData('rolelist.php').subscribe(data => {

      this.role = data;
      this.roleList = this.role.records;
      console.log(this.roleList);
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
  }

  register(){
    
    var loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    var branchId = loginInfo.branchId;
    this.infoRegister.branch = branchId;

    console.log(this.infoRegister);

    this.smisservice.postData('register.php', this.infoRegister).subscribe(data => {
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
