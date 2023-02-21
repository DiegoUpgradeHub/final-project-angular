import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';
import { AuthService } from 'src/app/core/services/auth.service';
// import { ProductsService } from '../products/services/products.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {

  deleteForm!: FormGroup;


  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public productService: ProductsService,
    public router: Router,
    public actRoute: ActivatedRoute
  ) {
    this.deleteForm = this.fb.group({
      _id: [''],
    })
  }

  ngOnInit(): void {
    let _id = this.actRoute.snapshot.paramMap.get('_id') as string;
    this.deleteForm.get('_id')?.setValue(_id);
  }

  deletingProduct() {
    this.productService.deleteProduct(this.deleteForm.value).subscribe(() => {
      this.router.navigate(['/products']);
    })
  }

}
