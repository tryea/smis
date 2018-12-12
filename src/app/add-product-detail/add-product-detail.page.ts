import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SmisService } from '../services/smis.service';
import { NavController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { finalize } from 'rxjs/operators';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-add-product-detail',
  templateUrl: './add-product-detail.page.html',
  styleUrls: ['./add-product-detail.page.scss'],
})
export class AddProductDetailPage implements OnInit {

  product: any;
  productList: any;
  responseData: any;
  createqr: any;
  createdCode: any;
  infoProductDetail = { 'productDetailName': '', 'productId': '', 'colour': '', 'size': '', 'stock': '' };
  // tslint:disable-next-line:max-line-length
  images = { 'imagePath': 'http://ersaptaaristo.xyz/img/add.png', 'currentName': '', 'correctPath': '', 'convertedImagePath': 'http://ersaptaaristo.xyz/img/add.png'};
  qrimages = { 'imagePath': '', 'currentName': '', 'correctPath': '', 'convertedImagePath': '' };
  // tslint:disable-next-line:max-line-length
  constructor(private smisservice: SmisService, private navCtrl: NavController, private camera: Camera, private webview: WebView,
    private actionSheetController: ActionSheetController, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private file: File, private barcodeScanner: BarcodeScanner) { }

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

  async startAddProductDetail() {
    await this.addProductDetail();
    await this.startUpload(this.images, 'product');
    //await this.startUpload(this.qrimages, 'QR');
    // this.startUpload(this.qrimages);
    // alert(this.responseData.message);
    // this.navCtrl.navigateForward('/home');
  }

  async addProductDetail() {
    console.log(this.infoProductDetail);
    this.smisservice.postData('addproductdetail.php', this.infoProductDetail).subscribe(data => {

      this.responseData = data;
      console.log(this.responseData);
      return this.responseData;
    }, (err: HttpErrorResponse) => {
      console.log(err.error);
      this.responseData = err.error;
      console.log(this.responseData);
      alert(this.responseData.message);
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image source',
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      // imagePath result = file:///storage/emulated/0/Android/data/io.ionic.starter/cache/1544422196041.jpg
      // correctPath result = 
      // current name result = 1544422196041.jpg
      console.log("imagePath: " + imagePath);
      var convertedImagePath = this.webview.convertFileSrc(imagePath);
      console.log("convertedImagePath: " + convertedImagePath);
      console.log("currentName: " + currentName);
      console.log("correctPath: " + correctPath);
      this.images.imagePath = imagePath;
      this.images.currentName = currentName;
      this.images.correctPath = correctPath;
      this.images.convertedImagePath = convertedImagePath;

      console.log(this.images);
      
      localStorage.setItem("images", JSON.stringify(this.images));
      this.ref.detectChanges();
    });
  }

  async startUpload(img,imgtype) {
    this.file.resolveLocalFilesystemUrl(img.imagePath)
      .then(entry => {
        var name = imgtype + "_" + this.responseData.productId + "_" + this.responseData.productDetailId + "_" + this.responseData.productDetailName ;
        (<FileEntry>entry).file(file => this.readFile(file,name))
      })
      .catch(err => {
        console.log('Error while reading file.');
      });
  }

  readFile(file: any, name) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, name);
      this.uploadImageData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {
    const loading = await this.loadingController.create({
      message: 'Uploading image...',
    });
    await loading.present();

    this.smisservice.uploadImage("upload.php", formData)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .subscribe(res => {
        if (res['success']) {
          console.log('File upload complete.')
        } else {
          console.log('File upload failed.')
        }
      });
  }

}
