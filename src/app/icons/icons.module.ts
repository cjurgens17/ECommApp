import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Menu, ShoppingCart, Coffee, X, Facebook, Instagram, Twitter, Trash} from 'angular-feather/icons';


const icons = {
    Menu,
    ShoppingCart,
    Coffee,
    X,
    Facebook,
    Instagram,
    Twitter,
    Trash
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
