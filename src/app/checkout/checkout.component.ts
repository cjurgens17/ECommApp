import { Component } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Cart } from '../products/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cart$ = this.productsService.cart$;

  constructor(private productsService: ProductsService) {}


  //functions -------
  totalPrice(cart: Cart): number {
    let total = 0;
    cart.products.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  }
}
