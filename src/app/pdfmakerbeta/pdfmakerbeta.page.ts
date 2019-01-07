import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File, IWriteOptions } from '@ionic-native/File/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-pdfmakerbeta',
  templateUrl: './pdfmakerbeta.page.html',
  styleUrls: ['./pdfmakerbeta.page.scss'],
})
export class PdfmakerbetaPage implements OnInit {

  letterObj = {
    to: '',
    from: '',
    text: ''
  }

  pdfObj = null;

  constructor(private socialSharing: SocialSharing, public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener) { }

  ngOnInit() {
  }

  createPdf() {
    var docDefinition = {
      content: [
        {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['First', 'Second', 'Third', 'The last one'],
              ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
              [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4']
            ]
          }
        }
      ]
    };

    console.log(docDefinition);
    console.log(docDefinition['content']);
    console.log(docDefinition['content'][0]);
    console.log(docDefinition['content'][0].table.body);

    docDefinition['content'][0].table.body.push(['abc','def','2','5']);

    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }
}
