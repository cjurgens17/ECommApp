import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { InMemoryService } from './inmemoryDB/in-memory.service';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    ViewProductComponent,
    ViewCartComponent,
    CheckoutComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryService),
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'viewproduct', component: ViewProductComponent},
      {path: 'viewcart', component: ViewCartComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: '', redirectTo:'home', pathMatch: 'full'},
      {path: '**', redirectTo: 'home', pathMatch: 'full'},

    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
