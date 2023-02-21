import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '', component: ProductsComponent
  },
  // {
  //   path: 'create-product', component: CreateProductComponent
  // },
  // {
  //   path: 'edit-product', component: EditProductComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
