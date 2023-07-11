import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../products/products';
import { ProductsService } from '../products/products.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

carouselIndex: number = 0;
advertisedProducts!: Product[];
private ngUnSubscribe = new Subject<void>();
carouselImages: string[] = [
  'https://images.unsplash.com/photo-1536914629078-6fda32a00cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmVlJTIwcG93ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  'https://media.istockphoto.com/id/627331730/photo/successful-middle-age-businessman.webp?b=1&s=170667a&w=0&k=20&c=5irIXSfOtmUQrQLH18gLiUP7lgsghRD_OvgjdGrVLAQ=',
  'https://media.istockphoto.com/id/1414977595/photo/woman-stir-coffee-with-coffee-spoon-coffee-cup-hot-drink-in-a-mug-beige-and-marble-background.webp?b=1&s=170667a&w=0&k=20&c=1N2xzyo7raTnkLarL2Rzw_JbZ7UN8L6q1sBSIy_OjLY='
];

constructor(private productService: ProductsService) {}

scrollToTop(){
  window.scroll(0,0);
}

moveLeft(){
  if(this.carouselIndex === this.carouselImages.length - 1){
    this.carouselIndex = 0;
  }else{
    this.carouselIndex++;
  }
}

moveRight(){
  console.log(this.carouselIndex);
  if(this.carouselIndex === 0){
    this.carouselIndex = this.carouselImages.length-1;
  }else{
    this.carouselIndex--;
  }
}

updateCarouselBackground(){
  let carouselItem = document.getElementById('carousel') as HTMLElement;
  carouselItem.style.backgroundImage = "url(" + this.carouselImages[this.carouselIndex] + ")";
}

  ////Lifecycle Hooks
  ngOnInit(): void {
    this.productService.getAdvertisedProducts()
    .pipe(
      takeUntil(this.ngUnSubscribe)
    )
    .subscribe({
      next: products => {
        this.advertisedProducts = products;
      },
      error: err => console.log(`Error: ${err}`)
  })
  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
