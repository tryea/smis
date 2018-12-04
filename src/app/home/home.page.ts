import { Component } from '@angular/core';
import { SmisService } from '../services/smis.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginInfo:{"username":"","role":""};

  constructor(private smisservice: SmisService, private navCtrl: NavController){}

  ngOnInit() {
      if(localStorage.getItem('loginInfo'))
      {
        this.loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
      }
      else{
        this.loginInfo = { "username": "", "role": "" };
        this.navCtrl.navigateBack('/login');
      }
      
      console.log(this.loginInfo); 
  }
  logout(){
    localStorage.removeItem('loginInfo');
    this.navCtrl.navigateForward('/login');
  }
  gotologin(){
    this.navCtrl.navigateForward('/login');
  }
}


/*
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      this.smisservice.getData('read.php').subscribe(data=>{
      console.log(data);
     });

    const infoProduct = {
      "name": "Amazing Pillow 4.0",
      "price": "300",
      "description": "The best pillow for amazing programmers.",
      "category_id": 2,
      "created": "2018-06-01 00:35:07"
    }
    this.smisservice.postData('create.php',infoProduct).subscribe(data => {
      console.log(data);
    });
*/
