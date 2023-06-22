import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ViewProductService } from './view-product.service';
import { Cart } from '../products/cart';
import { Product } from '../products/products';
import { ProductsService } from '../products/products.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit, OnDestroy {



  showPicture: boolean = true;
  cart!:Cart;
  products!: Product[];
  product$ = this.viewProductService.productSubject$;
  @Input() quantity: number = 1;

  private ngUnSubscribe = new Subject<void>();

  constructor(
    private viewProductService: ViewProductService,
    private productsService: ProductsService,
    private router: Router
    ) {}
    //functions-------
    incrementQuantity(maxQuan: number) {
      if(this.quantity < maxQuan){
        this.quantity++;
      }
    }

    decrementQuantity() {
      if (this.quantity > 1) {
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
    this.quantity = 1;
  }

  viewProduct(product:Product): void {
    this.viewProductService.swappingProductSubject(product);
    this.router.navigate(['/viewproduct']);
    }

    updateImage(value: boolean){
      this.showPicture = value;
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

    this.productsService.getProducts()
    .pipe(
      takeUntil(this.ngUnSubscribe)
    )
    .subscribe({
      next: products => this.products = products
    });
  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
