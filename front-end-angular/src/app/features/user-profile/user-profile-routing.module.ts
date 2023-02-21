import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';
import { CreateProductComponent } from '../create-product/create-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '', component: UserProfileComponent
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
export class UserProfileRoutingModule { }
