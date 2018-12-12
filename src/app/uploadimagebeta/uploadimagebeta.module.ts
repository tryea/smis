import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UploadimagebetaPage } from './uploadimagebeta.page';

const routes: Routes = [
  {
    path: '',
    component: UploadimagebetaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploadimagebetaPage]
})
export class UploadimagebetaPageModule {}
