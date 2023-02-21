import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { AuthService } from '../../core/services/auth.service';
import { ProductsService } from '../../core/services/products.service';
import { Router } from '@angular/router';
// import { ProductsService } from './../products/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup;

  constructor (
    public fb: FormBuilder,
    // public authService: AuthService,
    public productService: ProductsService,
    public router: Router
  ) {
    this.productForm = this.fb.group({
      name: [''],
      price: [''],
      ingredients: [''],
      image: [''],
      category: [''],
      vegetarian: ['']
    })
  }

  ngOnInit(): void {}

  creatingProduct() {
    this.productService.createProduct(this.productForm.value).subscribe(() => {
      this.router.navigate(['/products']);
    })
  }


}
