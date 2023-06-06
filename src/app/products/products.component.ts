import { Component, OnInit } from '@angular/core';
import { Products } from './products';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  title:string = 'Products Page';
  products!: Products[];

constructor(private productsService: ProductsService){}
//-----------LifeCycle Hooks---------------
  ngOnInit(): void {
    this.productsService.getProducts()
    .subscribe({
      next: products => this.products = products
    })
  }
}
