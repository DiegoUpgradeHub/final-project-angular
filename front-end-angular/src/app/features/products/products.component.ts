import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../core/models/product'
import { ProductsService } from '../../core/services/products.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../core/models/order';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  productsList: Product[] = [];
  newProduct: Product[] = [];
  currentUser: any = {};

//Lista de pedidos
  orders : Order[] = [];
  priceSum: number = 0;
  total: number;

  deleteForm!: FormGroup;


  protected readonly clearSubscriptions$ = new Subject();

  constructor(
    public productsService: ProductsService,
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    public productService: ProductsService,
    public router: Router,
    public authService: AuthService,
  ) {
    this.deleteForm = this.fb.group({
      _id: [''],
    })
  }

  ngOnInit(): void {
    //Obtener datos de la base de datos
    this.recoverProducts();
    //Obtener datos del usuario
    let id = localStorage.getItem('_id')
    this.authService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    })
    console.log(this.authService.currentUser)
  }

  public ngOnDestroy() {
    this.clearSubscriptions$.complete();
  }

  recoverProducts() {
    return this.productsService.getProducts().pipe(takeUntil(this.clearSubscriptions$),).subscribe((data)=> {
      this.productsList = data
    })
  }

  remove(id:number, price: number){
    this.orders = this.orders.filter((v,i)=> i !== id);
    this.priceSum = this.priceSum - price;
  }

  selectProduct(name: string, price: number) {
    let order = new Order();
    order.name = name;
    order.price = price;
    this.priceSum =  this.priceSum + price;
    this.orders.push(order);
  }
//No está funcionando correctamente, necesito copiar y pegar el _id del producto
  deletingProduct() {
    this.productService.deleteProduct(this.deleteForm.value).subscribe(() => {
      window.location.reload();
    })
  }

}
