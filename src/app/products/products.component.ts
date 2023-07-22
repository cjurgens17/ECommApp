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
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  title: string = 'Products Page';
  products!: Product[];
  cart!: Cart;
  awardProducts!: Product[];
  coldBrew!: Product[];

  private ngUnSubscribe = new Subject<void>();

  constructor(
    private productsService: ProductsService,
    private viewProductService: ViewProductService,
    private router: Router
  ) {}

  //----------------cart functions------

  viewProduct(product: Product): void {
    this.viewProductService.swappingProductSubject(product);
    this.router.navigate(['/viewproduct']);
    window.scrollTo(0, 0);
  }

  //code discount removal
  public hideFixedElement(): void {
    const fixedElement = document.getElementById('fixedElement');
    fixedElement?.classList.add('hidden');
  }
  //-----------LifeCycle Hooks---------------
  ngOnInit(): void {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe({
        next: (products) => (this.products = products),
      });

    this.productsService
      .getAdvertisedProducts()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe({
        next: (awProducts) => (this.awardProducts = awProducts),
      });

    this.productsService.cart$.pipe(takeUntil(this.ngUnSubscribe)).subscribe({
      next: (cart) => (this.cart = cart),
    });

    this.productsService
      .getColdBrewProducts()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe({
        next: (coldBrew) => (this.coldBrew = coldBrew),
      });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
