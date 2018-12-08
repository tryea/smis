import { Component, OnInit } from '@angular/core';
import { SmisService } from '../services/smis.service';
import { NavController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  infoLogin = { "username": "", "password": "" };
  responseData: any;
  statusLogin:any;
  constructor(private smisservice: SmisService, private navCtrl: NavController) {
    
  }

  ngOnInit() {
  }

  login(){

      console.log(this.infoLogin);
      this.smisservice.postData('login.php', this.infoLogin).subscribe(data => {

        this.responseData = data;
        console.log(this.responseData.status);
        this.statusLogin = this.responseData.message;
        console.log(this.statusLogin);
        console.log(this.responseData);
        if (this.statusLogin == "Login Success") {
          this.responseData = JSON.stringify(this.responseData);
          localStorage.setItem("loginInfo", this.responseData);
          this.navCtrl.navigateForward('/home');
        }
      }, (err: HttpErrorResponse) => {
        console.log(err.error);
        this.responseData = err.error;
        alert(this.responseData.message);
      });

  }

}
