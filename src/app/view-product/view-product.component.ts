import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ViewProductService } from './view-product.service';
import { Cart } from '../products/cart';
import { Product } from '../products/products';
import { ProductsService } from '../products/products.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit, OnDestroy {

  cart!:Cart;
  product$ = this.viewProductService.productSubject$;
  @Input() quantity: number = 0;

  private ngUnSubscribe = new Subject<void>();

  constructor(
    private viewProductService: ViewProductService,
    private productsService: ProductsService
    ) {}
    //functions-------
    incrementQuantity() {
      this.quantity++;
    }

    decrementQuantity() {
      if (this.quantity > 0) {
        this.quantity--;
      }
    }

  addToCart(product: Product): void {
    //if we already have item in cart
    let check = false;
    this.cart.products.find((item) => {
    if(item.name === product.name){
      check = true;
      item.quantity += this.quantity;
      }
      }
    );
    //item is not in cart
    if(!check){
      product.quantity = this.quantity;
      this.cart.products.push(product);
    }
    
    this.cart.size = this.cart.products.length;
    console.log(this.cart);
    this.productsService.setNextCart(this.cart);
  }
//-------------------Lifecycle hooks
  ngOnInit(): void {

    this.productsService.cart$
    .pipe(
      takeUntil(this.ngUnSubscribe)
    )
    .subscribe({
      next: cart => this.cart = cart
    });
  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }


}
