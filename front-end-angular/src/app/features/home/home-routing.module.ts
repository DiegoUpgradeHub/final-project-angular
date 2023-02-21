import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
// import { SignupComponent } from '../signup/signup.component';
// import { SigninComponent } from '../signin/signin.component';
// import { ProductsComponent } from './../products/products.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  // {
  //   path: 'products', component: ProductsComponent
  // },
  // {
  //   path: 'log-in', component: SigninComponent
  // },
  // {
  //   path: 'sign-up', component: SignupComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
