import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ViewProductService } from './view-product.service';
import { Cart } from '../products/cart';
import { Product } from '../products/products';
import { ProductsService } from '../products/products.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit, OnDestroy {
  showPicture: boolean = true;
  cart!: Cart;
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
  incrementQuantity(product:Product) {
    if(product.name.length > 0){
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
    if(product.name.length <= 0) return;
    let check = false;
    this.cart.products.find((item) => {
      if (item.name === product.name) {
        check = true;
        item.quantity += this.quantity;
      }
    });
    //item is not in cart
    if (!check) {
      product.quantity = this.quantity;
      this.cart.products.push(product);
    }

    this.cart.size = this.cart.products.length;
    console.log(this.cart);
    this.productsService.setNextCart(this.cart);
    this.quantity = 1;
  }

  showElement(product: Product) {
     //adding css class for user feedback element of adding to the cart
     if(product.name.length > 0){
     const cartButton = document.getElementById('addToCartBtn') as HTMLButtonElement;
     const addElement = document.getElementById('appear');

     cartButton.disabled = true;
     addElement?.classList.add('show');

     //removing the css so the element goes away
     setTimeout(() => {
      addElement?.classList.remove('show');
      cartButton.disabled = false;
     }, 3000);
    }
  }

  viewProduct(product: Product): void {
    this.viewProductService.swappingProductSubject(product);
    this.router.navigate(['/viewproduct']);
  }

  updateImage(value: boolean) {
    this.showPicture = value;
  }

  //Changing the styling of background image for .products-grid .card-img div container dynamically with
  //mouseover and mouseout events
  // changeToAltImage(product: Product, index: number): void {
  //   const varImage = document.getElementById(`varImage${index}`) as HTMLElement;
  //   if (varImage) {
  //     varImage.style.backgroundImage = `url(${product.altImage})`;
  //   }
  // }

  // changeToReg(product: Product, index: number): void {
  //   const varImage = document.getElementById(`varImage${index}`) as HTMLElement;
  //   if (varImage) {
  //     varImage.style.backgroundImage = `url(${product.image})`;
  //   }
  // }
  //End of last comment, keep these methods jumbled together for better identity and seperation of concerns

  scrollToTop(): void {
    window.scrollTo({top: 100, behavior: 'smooth'});
  }

  hideFixedElement(): void {
    const fixedElement = document.getElementById('fixedElement');
    fixedElement?.classList.add('hidden');
  }

  //-------------------Lifecycle hooks
  ngOnInit(): void {
    this.productsService.cart$.pipe(takeUntil(this.ngUnSubscribe)).subscribe({
      next: (cart) => (this.cart = cart),
    });

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
