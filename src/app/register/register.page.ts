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
  infoRegister = { "username": "", "password": "","role": "" };
  responseData: any;
  statusRegister: any;
  constructor(private smisservice:SmisService, private navCtrl:NavController) { }

  ngOnInit() {
  }

  register(){
    console.log(this.infoRegister);
    this.smisservice.postData('register.php', this.infoRegister).subscribe(data => {
      
      this.responseData = data;
      console.log(this.responseData.status);
      this.statusRegister = this.responseData.message;
      console.log(this.statusRegister);
      console.log(this.responseData);
      if (this.statusRegister == "Register Success") {
        this.responseData = JSON.stringify(this.responseData);
        localStorage.setItem("loginInfo", this.responseData);
        this.navCtrl.navigateForward('/home');
      }
      else {
        alert("Username already Exist");
      }
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      alert(this.responseData.message);
    });
  }

}
