import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SmisService } from '../services/smis.service';
import { NavController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-uploadimagebeta',
  templateUrl: './uploadimagebeta.page.html',
  styleUrls: ['./uploadimagebeta.page.scss'],
})
export class UploadimagebetaPage implements OnInit {

  images = { 'imagePath': "http://ersaptaaristo.xyz/img/add.png", 'currentName': '', 'correctPath': '', 'convertedImagePath': 'http://ersaptaaristo.xyz/img/add.png' };
  imageURI = '';
  imageFileName = '';
  constructor(private smisservice: SmisService, private navCtrl: NavController, private camera: Camera, private webview: WebView,
    private actionSheetController: ActionSheetController, private toastCtrl: ToastController, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private file: File, private http: HttpClient ) { }

  ngOnInit() {
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
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

  startUpload(img) {
    this.file.resolveLocalFilesystemUrl(this.images.imagePath)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file))
      })
      .catch(err => {
        console.log('Error while reading file.');
      });
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      formData.append('file', imgBlob, file.name);
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
