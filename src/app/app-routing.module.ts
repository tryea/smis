import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'addCategory', loadChildren: './add-category/add-category.module#AddCategoryPageModule' },
  { path: 'addProduct', loadChildren: './add-product/add-product.module#AddProductPageModule' },
  { path: 'addProductDetail', loadChildren: './add-product-detail/add-product-detail.module#AddProductDetailPageModule' },
  { path: 'updateStock', loadChildren: './update-stock/update-stock.module#UpdateStockPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
