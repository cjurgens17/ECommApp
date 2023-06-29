import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './products';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private cartSubject = new BehaviorSubject<Cart>(
    {
      products: [],
      size: 0,
      price: 0
    }
  );
  cart$ = this.cartSubject.asObservable();


  constructor(private http: HttpClient) { }

  SERVER_URL: string = 'http://localhost:8080/api';
    ///----------------Http calls
  getProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.SERVER_URL}/products`);
  }

  getAdvertisedProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.SERVER_URL}/advertisedProducts`);
  }

  getAwardProducts():Observable<Product[]> {
    return this.http.get<Product[]>(`${this.SERVER_URL}/awardProducts`);
  }

  getColdBrewProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.SERVER_URL}/coldBrew`);
  }


  //------functions
  setNextCart(cart: Cart): void {
    this.cartSubject.next(cart);
  }

}
