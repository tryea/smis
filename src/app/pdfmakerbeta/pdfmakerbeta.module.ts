import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PdfmakerbetaPage } from './pdfmakerbeta.page';

const routes: Routes = [
  {
    path: '',
    component: PdfmakerbetaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PdfmakerbetaPage]
})
export class PdfmakerbetaPageModule {}
