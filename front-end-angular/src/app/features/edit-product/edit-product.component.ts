import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

  editForm!: FormGroup;

  constructor (
    public fb: FormBuilder,
    public authService: AuthService,
    public productService: ProductsService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      _id: [''],
      name: [''],
      price: [''],
      ingredients: [''],
      image: [''],
      category: [''],
      vegetarian: ['']
    })
  }

  ngOnInit(): void {
    let name = this.actRoute.snapshot.paramMap.get('name') as string;
    this.productService.getSingleProduct(name).subscribe(res => {
        console.log(res);
        this.editForm.get('_id')?.setValue(res[0]._id);
        this.editForm.get('name')?.setValue(res[0].name);
        this.editForm.get('price')?.setValue(res[0].price);
        this.editForm.get('ingredients')?.setValue(res[0].ingredients);
        this.editForm.get('image')?.setValue(res[0].image);
        this.editForm.get('category')?.setValue(res[0].category);
        this.editForm.get('vegetarian')?.setValue(res[0].vegetarian);
      })
  }

  editingProduct() {
    this.productService.editProduct(this.editForm.value).subscribe(() => {
      this.router.navigate(['/products']);
    })
  }
}
