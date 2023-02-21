import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
// import { Product } from 'src/app/features/products/models/product';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Definimos el endpoint y los headers para poder realizar la petición
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {}; //Aquí almacenaremos el usuario
  currentProduct = {}; //Aquí almacenaremos el usuario
  roleCurrentUser?: ''; //Aquí almacenaremos el rol del usuario

  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  //Sign-up -> método que guarda al user en la BBDD de MongoDB
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
    .pipe(
      catchError(this.handleError)
    )
  };

  //Sign-in
  signIn(user: User){
    return this.http.post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        localStorage.setItem('_id', res._id)
        //Para setear el token y el _id
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.msg._id]);
        //Volvemos al user-profile una vez ejecutada la función
        })
      })
  };

  //getToken
  getToken() {
    return localStorage.getItem('access_token');
  }
  //is logged in
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  //do logout
  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['home']);
    }
  }

  //Obtener el User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers:this.headers }).pipe(
      map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  //ir al User Profile
  userProfile() {
    let id = localStorage.getItem('_id');
    this.router.navigate(['user-profile/' + id]);
  }

  // //crear producto
  // createProduct(product: Product): Observable<any> {
  //   let api = `${this.endpoint}/products/create`;
  //   return this.http.post(api, product)
  //   .pipe(
  //     catchError(this.handleError)
  //   )
  // };

  // //editar producto
  // editProduct(product: Product): Observable<any> {
  //   let id = product._id
  //   let api = `${this.endpoint}/products/edit/${id}`;
  //   return this.http.put(api, product)
  //   .pipe(
  //     catchError(this.handleError)
  //   )
  // };

  // //delete product
  // deleteProduct(product: Product): Observable<any> {
  //   let id = product._id
  //   let api = `${this.endpoint}/products/delete/${id}`;
  //   return this.http.delete(api)
  //   .pipe(
  //     catchError(this.handleError)
  //   )
  // };

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      //client-side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}

