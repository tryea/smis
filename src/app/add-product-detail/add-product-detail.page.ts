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
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

declare var cordova: any;

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
  infoProductDetail = { 'productDetailName': '', 'productId': '', 'colour': '', 'size': ''};
  // tslint:disable-next-line:max-line-length
  images = { 'imagePath': 'http://ersaptaaristo.xyz/img/add.png', 'currentName': '', 'correctPath': '', 'convertedImagePath': 'http://ersaptaaristo.xyz/img/add.png'};
  qrimages = { 'imagePath': '', 'currentName': '', 'correctPath': '', 'convertedImagePath': '' };
  // tslint:disable-next-line:max-line-length
  constructor(private smisservice: SmisService, private navCtrl: NavController, private camera: Camera, private webview: WebView,
    private actionSheetController: ActionSheetController, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private file: File, private barcodeScanner: BarcodeScanner, private transfer: FileTransfer ) { }

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
    // alert(this.responseData.message);
    // this.navCtrl.navigateForward('/home');
  }

  async addProductDetail() {
    console.log(this.infoProductDetail);
    this.smisservice.postData('addproductdetail.php', this.infoProductDetail).subscribe(data => {
      this.responseData = data;
      console.log(this.responseData);
      this.generateqr(this.responseData.productDetailId);
      this.startUpload(this.images, 'product');

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
        var name = imgtype + "_" + this.responseData.productId + "_" + this.responseData.productDetailId + "_" + this.responseData.productDetailName + ".jpg";
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

  async generateqr(id){
    this.qrimages.imagePath = "http://ersaptaaristo.xyz/product/qrcode.php?text="+id;
  }

  async saveqr(){
    let path = null;
    let path2 = null;
    let localstrg = null;
    var name = "QR" + "_" + this.responseData.productId + "_" + this.responseData.productDetailId + "_" + this.responseData.productDetailName + ".jpg";
    //path = this.file.externalApplicationStorageDirectory;
    path = this.file.externalApplicationStorageDirectory;
    localstrg = path.indexOf("Android");
    path2 = path.substr(0, localstrg - 1) + "/Download/";
    console.log("path1: " + path);
    console.log("path2: " + path2);
    //path = "../.."
    const transfer = this.transfer.create();
    transfer.download(this.qrimages.imagePath, path2 + name).then(entry => {
      let url = entry.toURL();
      console.log(url);
    });
  }
  // download(imageURL) {
  //   const fileTransfer: FileTransferObject = this.transfer.create();
  //   let targetPath = cordova.file.externalRootDirectory + "download/" + moment().format("YYYYMMDDHHmmsss") + ".jpg";
  //   fileTransfer.download(imageURL, targetPath, true).then((entry) => {
  //     alert('download complete: ' + entry.toURL());
  //   }, (error) => {
  //     console.log("download error source " + error.source);
  //     console.log("download error target " + error.target);
  //     console.log("upload error code" + error.code);
  //   });
  // }

}
