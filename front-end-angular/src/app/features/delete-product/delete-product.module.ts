import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteProductRoutingModule } from './delete-product-routing.module';
import { DeleteProductComponent } from './delete-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DeleteProductComponent
  ],
  imports: [
    CommonModule,
    DeleteProductRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DeleteProductModule { }
