import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/products';
import { Router } from '@angular/router';
import { Cart } from '../products/cart';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit, OnDestroy{


  cart$ = this.productsService.cart$;
  private ngUnSubscribe = new Subject<void>();
  constructor(
    private productsService: ProductsService,
    private Router: Router
    ){}


  //functions----
  decrementQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  incrementQuantity(product: any) {
    product.quantity++;
  }

  getTotalAmount(products: Product[]): number {
    let total = 0;
    products.forEach((product) => {
      total += product.quantity * product.price;
    });
    return total;
  }

  removeFromCart(products: Product[], product:Product){
    const findIndex = products.findIndex((item) => item === product);
    if(findIndex !== -1){
      products.splice(findIndex,1);
    }
  }

  checkout(cart: Cart): void {
    console.log(cart);
    this.productsService.setNextCart(cart);
    this.Router.navigate(['/checkout']);
  }


  //Lifecycle hooks--------------------
  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
