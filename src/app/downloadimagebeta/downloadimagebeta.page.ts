import { Component, OnInit } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/File/ngx';
@Component({
  selector: 'app-downloadimagebeta',
  templateUrl: './downloadimagebeta.page.html',
  styleUrls: ['./downloadimagebeta.page.scss'],
})
export class DownloadimagebetaPage implements OnInit {

  constructor(private transfer: FileTransfer, private file: File) { }

  ngOnInit() {
  }

  downloadimage(){

    let path = null;
    let path2 = null;
    let localstrg = null;
    //path = this.file.externalApplicationStorageDirectory;
    path = this.file.externalApplicationStorageDirectory;
    localstrg = path.indexOf("Android");;
    path2 = path.substr(0, localstrg - 1) + "/Download/";
    console.log("path1: " + path);
    console.log("path2: " + path2);
    //path = "../.."
    const transfer = this.transfer.create();
    transfer.download('http://ersaptaaristo.xyz/product/qrcode.php?text=123', path2 + 'myfile.jpg').then(entry => {
      let url = entry.toURL();
      console.log(url);
    });
  }

}
