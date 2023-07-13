import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../products/products';
import { ProductsService } from '../products/products.service';
import { Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
intervalController: number | null = null;
carouselElement!: HTMLElement;
carouselImage!: HTMLImageElement;
carouselIndex: number = 0;
colorIndex: number = 0;
advertisedProducts!: Product[];
private ngUnSubscribe = new Subject<void>();
carouselImages: string[] = [
  "https://i.insider.com/5981c995b50ab126008b6605?width=700",
  'https://spice4life.co.za/wp-content/uploads/2022/09/Screenshot-2022-09-26-at-09.36.38.png',
  'https://www.medianews4u.com/wp-content/uploads/2023/05/Mothers-Day-Campaigns-Part-2-1.jpg'
];

carouselColors: string[] = [
  'hsl(165.56,79.41%,47.33%, 1)', 'hsl(50.48,96.6%,53.92%,1)', '#FF8DBD'
];

constructor(private productService: ProductsService) {}

scrollToTop(){
  window.scroll(0,0);
}
//for carousel-----------------------------------------

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
  this.carouselImage.classList.remove('fade-in');
  this.carouselImage.classList.add('fade-out');

  setTimeout(() => {
    this.carouselImage.src = `${this.carouselImages[this.carouselIndex]}`;

    this.carouselImage.classList.remove('fade-out');
    this.carouselImage.classList.add('fade-in');
  }, 400);

}

moveLeftColor(){
  if(this.colorIndex === this.carouselColors.length - 1){
    this.colorIndex = 0;
  }else{
    this.colorIndex++;
  }
}

moveRightColor(){
  if(this.colorIndex === 0){
    this.colorIndex = this.carouselColors.length-1;
  }else{
    this.colorIndex--;
  }
}

updateCarouselBackgroundColor(){
  let colorItem = document.getElementById('color') as HTMLElement;
  colorItem.style.backgroundColor = `${this.carouselColors[this.colorIndex]}`;
  colorItem.style.transition = `background-color 800ms ease-in`;
  let carouselImageTitle = document.getElementById('carousel-image-title') as HTMLElement;
  carouselImageTitle.style.transition = `background-color 800ms ease-in`;
  //styles for different background colors
  switch(this.colorIndex){
    case 0:
      carouselImageTitle.textContent = 'Have A Blast';
      carouselImageTitle.style.backgroundColor = '#FF8DBD';
      break;
    case 1:
      carouselImageTitle.textContent = 'Feel Energized';
      carouselImageTitle.style.backgroundColor = '#7CE993';
      break;
    case 2:
      carouselImageTitle.textContent = 'Warm Up';
      carouselImageTitle.style.backgroundColor = 'hsl(50.48,96.6%,53.92%,1)';
      break;
     default:
      break;
  }
}
//updates the background of carousel circle to match the current index of image that is being displayed
updateCircle(){
let circles = document.getElementsByClassName('circle');
let fullCircle = document.getElementsByClassName('carousel-fill-circle');
fullCircle[0].classList.remove('carousel-fill-circle');
circles[this.carouselIndex].classList.add('carousel-fill-circle');
}


//------automation for the carousel
startInterval(carouselFunctions: Function[]): void{
  if(this.intervalController === null){
    console.log('Interval Triggered');
    console.log(this.colorIndex);
    this.intervalController = window.setInterval(() => {
      for(let cfunction of carouselFunctions){
        cfunction();
      }
    }, 3000);
  }
}

//----end of carousel

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
  });

  //setting initial background color for carousel item
  this.carouselElement = document.getElementById('color') as HTMLElement;
  this.carouselElement.style.background = `${this.carouselColors[this.colorIndex]}`;
  this.carouselImage = document.getElementById('carousel-image') as HTMLImageElement;
  this.carouselImage.src = `${this.carouselImages[this.carouselIndex]}`;
  //starting the carousel
  this.startInterval([
    this.moveRightColor,
    this.updateCarouselBackgroundColor,
    this.moveRight,
    this.updateCarouselBackground,
    this.updateCircle
  ]);

  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
