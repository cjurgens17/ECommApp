import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '../products/products';
import { ProductsService } from '../products/products.service';
import { Subject, takeUntil} from 'rxjs';
import { MovingProduct } from './movingproduct';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('flexContainer') flexContainer!: ElementRef;
animateContainers: HTMLElement[] = [];
intervalController: ReturnType<typeof setInterval>  = setInterval(() => {
  this.moveLeftColor(),
  this.updateCarouselBackgroundColor(),
  this.moveLeft(),
  this.updateCarouselBackground(),
  this.updateCircle()
}, 4300);
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
products!: Product[];



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

restartCarousel(): ReturnType<typeof setInterval>  {
  clearInterval(this.intervalController);
  this.intervalController = setInterval(() => {
    this.moveLeftColor(),
    this.updateCarouselBackgroundColor(),
    this.moveLeft(),
    this.updateCarouselBackground(),
    this.updateCircle()
  }, 4300);
  return this.intervalController;
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

  // this.productService.getProducts()
  // .pipe(
  //   takeUntil(this.ngUnSubscribe)
  // )
  // .subscribe({
  //   next: products => {
  //     this.products = products;
  //   },
  //   error: e => console.error('Error on getProducts OnInit: ', e)
  // });

  //setting initial background color for carousel item
  this.carouselElement = document.getElementById('color') as HTMLElement;
  this.carouselElement.style.background = `${this.carouselColors[this.colorIndex]}`;
  this.carouselImage = document.getElementById('carousel-image') as HTMLImageElement;
  this.carouselImage.src = `${this.carouselImages[this.carouselIndex]}`;
  }

  ngAfterViewInit(): void {
    // Product Animation Logic -----------------------------
    // Extend the prototype of HTMLCollection

    let movingChildren: MovingProduct[] = [];
    let animationPause: boolean = false;
    let animationParent = this.flexContainer.nativeElement;
    console.log('animation parent',animationParent);
    let animationParentWidth = parseInt(getComputedStyle(animationParent).getPropertyValue('width'));
    console.log(animationParentWidth)
    let animationParentGap = parseInt(getComputedStyle(animationParent).getPropertyValue('gap'));
    console.log(animationParentGap);
    setTimeout(() => {
       this.animateContainers = Array.from(animationParent.children) as HTMLElement[];
      console.log('Animated Containers',this.animateContainers);
    }, 2000);
    console.log('animation containers',this.animateContainers);

    //functions for Product Animation
function fillMovingChildren(products: HTMLElement[], parentWidth: number){
  console.log('in movingchildren function: products:', products);
  for(let product of products){
    console.log(product);
  }

  products.forEach((product) => {

    let animatedProduct: MovingProduct = {
      child: product,
      offsetLeft: product.offsetLeft,
      parentoffsetWidth: parentWidth
    };

    console.log('animatedProduct',animatedProduct);

    movingChildren.push(animatedProduct);
  });
};


    // adding listeners for animation functionality
    function addEventListenersToProductAnimation(containers: HTMLElement[]){
        Array.from(containers).forEach((container) => {
          (function(){
            container.addEventListener('mouseenter', () => {
              container.style.transform = 'scale(1.1)';
              animationPause = true;
            });
            container.addEventListener('mouseleave', () => {
              container.style.transform = 'scale(1)';
              animationPause = false;
              requestAnimationFrame(productFlow);
            });
          })();
        })
    }

    //Main Animation function
    function productFlow(time: DOMHighResTimeStamp){
      console.log('movingchildren',movingChildren);
      for(let i = 0;i<movingChildren.length;i++){
        let movingChild = movingChildren[i];
        let currentLeftValue = parseInt(getComputedStyle(movingChild.child).getPropertyValue('left'));
        let currentObjectWidth = parseInt(getComputedStyle(movingChild.child).getPropertyValue('width'));
        let speed = currentLeftValue - 1;
        movingChild.child.style.left = `${speed}px`;

        if(speed <= -(movingChild.offsetLeft + currentObjectWidth + animationParentGap)){
          movingChild.child.style.left = `${-movingChild.offsetLeft + movingChild.parentoffsetWidth + animationParentGap}px`;
        }

        if(!animationPause){
          requestAnimationFrame(productFlow);
        }
      }
    }
    //End Animation Logic--------------------
    //calling functinos, waiting for async data to load so func param are sufficient
    setTimeout(() => {
      fillMovingChildren(this.animateContainers,animationParentWidth);
      addEventListenersToProductAnimation(this.animateContainers);
      requestAnimationFrame(productFlow);
    },2500);
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
