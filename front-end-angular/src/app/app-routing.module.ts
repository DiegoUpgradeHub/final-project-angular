import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: `user-profile/:id`, loadChildren: () =>
      import('./features/user-profile/user-profile.module').then(m => m.UserProfileModule),
      canActivate: [AuthGuard]
  },
  {
    path: `sign-up`, loadChildren: () =>
      import('./features/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: `log-in`, loadChildren: () =>
      import('./features/signin/signin.module').then(m =>m.SigninModule)
  },
  {
    path: `home`, loadChildren: () =>
      import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: `products`, loadChildren: () =>
      import('./features/products/products.module').then(m => m.ProductsModule),
      canActivate: [AuthGuard]
  },
  {
    path: `create-product`, loadChildren: () =>
      import('./features/create-product/create-product.module').then(m => m.CreateProductModule),
      canActivate: [AuthGuard]
  },
  {
    path: `edit-product`, loadChildren: () =>
      import('./features/edit-product/edit-product.module').then(m => m.EditProductModule),
      canActivate: [AuthGuard]
  },
  {
    path: `edit-product/:name`, loadChildren: () =>
      import('./features/edit-product/edit-product.module').then(m => m.EditProductModule),
      canActivate: [AuthGuard]
  },
  {
    path: `delete-product`, loadChildren: () =>
      import('./features/delete-product/delete-product.module').then(m => m.DeleteProductModule),
      canActivate: [AuthGuard]
  },
  {
    path: `delete-product/:_id`, loadChildren: () =>
      import('./features/delete-product/delete-product.module').then(m => m.DeleteProductModule),
      canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: '/log-in', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
