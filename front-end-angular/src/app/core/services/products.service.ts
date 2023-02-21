import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// import { User } from '../models/user';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  //Definition of endpoint and header to do the API request
  // endpoint: string = 'https://backend-restaurant-menu.vercel.app';
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {}; //Aquí almacenaremos el usuario

  constructor (
    private http: HttpClient,
    public router: Router
    ) { }

  //Get all products
  getProducts(): Observable<any> {
    // let api = `https://backend-restaurant-menu.vercel.app`;
    let api = `${this.endpoint}/products/`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //Get only 1 product
  getSingleProduct(name: string): Observable<any> {
    return this.http.get(`${this.endpoint}/products/name/${name}`)
  }

  //Create a new product
  createProduct(product: Product): Observable<any> {
    let api = `${this.endpoint}/products/create`;
    return this.http.post(api, product)
    .pipe(
      catchError(this.handleError)
    )
  };

  //Edit a new product
  editProduct(product: Product): Observable<any> {
    let id = product._id
    let api = `${this.endpoint}/products/edit/${id}`;
    return this.http.put(api, product)
    .pipe(
      catchError(this.handleError)
    )
  };

  //Delete a new product
  deleteProduct(product: Product): Observable<any> {
    let id = product._id
    let api = `${this.endpoint}/products/delete/${id}`;
    return this.http.delete(api)
    .pipe(
      catchError(this.handleError)
    )
  };

  // Gestión de errores
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
