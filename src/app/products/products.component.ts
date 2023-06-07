import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './products';
import { ProductsService } from './products.service';
import { Cart } from './cart';
import { Subject, takeUntil } from 'rxjs';
import { ViewProductService } from '../view-product/view-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  title:string = 'Products Page';
  products!: Product[];
  cart!: Cart;

  private ngUnSubscribe = new Subject<void>();

constructor(
  private productsService: ProductsService,
  private viewProductService: ViewProductService,
  private router: Router
   ){}



//----------------cart functions------

viewProduct(product:Product): void {
this.viewProductService.swappingProductSubject(product);
this.router.navigate(['/viewproduct']);
}
//-----------LifeCycle Hooks---------------
  ngOnInit(): void {
    this.productsService.getProducts()
    .pipe(
      takeUntil(this.ngUnSubscribe)
    )
    .subscribe({
      next: products => this.products = products
    });

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
