import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { AddProductDetailPage } from './add-product-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AddProductDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxQRCodeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddProductDetailPage]
})
export class AddProductDetailPageModule {}
