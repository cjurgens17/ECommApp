import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../products/products';

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {


  private productSubject = new BehaviorSubject<Product>(
    {
    id: 0,
    name: '',
    price: 0,
    image: '',
    altImage: '',
    quantity: 0,
    type: ''
  }
  );
  productSubject$ = this.productSubject.asObservable();
  constructor() { }

  swappingProductSubject(product: Product): void {
    this.productSubject.next(product);
  }
}
