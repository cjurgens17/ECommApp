import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../products/products';

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {


  private productSubject = new BehaviorSubject<Product>(
    {
    id: 1,
    name: `chock full o' Nuts`,
    price: 9.99,
    image: 'https://m.media-amazon.com/images/I/81TBeTikHhL._AC_UL400_.jpg',
    altImage: 'https://m.media-amazon.com/images/I/818na+MgHtL._SX679_.jpg',
    quantity: 15,
    type: ''
  }
  );
  productSubject$ = this.productSubject.asObservable();
  constructor() { }

  swappingProductSubject(product: Product): void {
    this.productSubject.next(product);
  }
}
