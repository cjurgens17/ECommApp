import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  options: boolean = false;
  currentCart$ = this.productsService.cart$;

  constructor(
    private productsService: ProductsService
  ) {}

  public showOptions(): void {
    const getShow = document.getElementById('burgerOptions') as HTMLElement;
    const menuBar = document.getElementById('menubar') as HTMLElement;

    this.options = !this.options;

    if (this.options) {
      getShow.classList.add('show');
      menuBar.classList.add('hide');
    } else {
      getShow.classList.remove('show');
    }

    this.options = !this.options;
  }

  public backToBurger(): void {
    const getShow = document.getElementById('burgerOptions') as HTMLElement;
    const menuBar = document.getElementById('menubar') as HTMLElement;

    getShow.classList.remove('show');
    menuBar.classList.remove('hide');
  }

  //Lifecycle Hooks

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
