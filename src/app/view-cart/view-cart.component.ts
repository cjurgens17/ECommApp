import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/products';
import { Router } from '@angular/router';
import { Cart } from '../products/cart';
import { ViewProductService } from '../view-product/view-product.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit, OnDestroy{
  screenWidth!: number;
  products !: Product[];
  cart$ = this.productsService.cart$;
  private ngUnSubscribe = new Subject<void>();
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private viewProductService: ViewProductService
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
    this.router.navigate(['/checkout']);
  }

  viewProduct(product: Product): void {
    this.viewProductService.swappingProductSubject(product);
    this.router.navigate(['/viewproduct']);
  }

  onResize() {
    this.screenWidth = window.innerWidth;
  }

  isMobile() {
    return this.screenWidth <= 550;
  }


  //Lifecycle hooks--------------------
  ngOnInit(): void {

    this.screenWidth = window.innerWidth;
    window.addEventListener('resize', this.onResize.bind(this));

    this.productsService
    .getProducts()
    .pipe(takeUntil(this.ngUnSubscribe))
    .subscribe({
      next: (products) => (this.products = products),
    });

  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
