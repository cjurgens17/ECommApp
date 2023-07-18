import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Product } from '../products/products';
import { ProductsService } from '../products/products.service';
import { Subject, takeUntil} from 'rxjs';
import { ViewProductService } from '../view-product/view-product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {


animationImages: HTMLImageElement[] = [];
// intervalController: ReturnType<typeof setInterval>  = setInterval(() => {
//   this.moveLeftColor(),
//   this.updateCarouselBackgroundColor(),
//   this.moveLeft(),
//   this.updateCarouselBackground(),
//   this.updateCircle()
// }, 4300);
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





constructor(private productService: ProductsService, private elementRef: ElementRef, private viewProductService: ViewProductService, private router: Router) {}

passProduct(product: Product){
  this.viewProductService.swappingProductSubject(product);
  this.router.navigate(['/viewproduct']).then(() => {
    window.scrollTo(0, 0);
  });
}

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

// restartCarousel(): ReturnType<typeof setInterval>  {
//   clearInterval(this.intervalController);
//   this.intervalController = setInterval(() => {
//     this.moveLeftColor(),
//     this.updateCarouselBackgroundColor(),
//     this.moveLeft(),
//     this.updateCarouselBackground(),
//     this.updateCircle()
//   }, 4300);
//   return this.intervalController;
// }

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
  // this.carouselElement = document.getElementById('color') as HTMLElement;
  // this.carouselElement.style.background = `${this.carouselColors[this.colorIndex]}`;
  // this.carouselImage = document.getElementById('carousel-image') as HTMLImageElement;
  // this.carouselImage.src = `${this.carouselImages[this.carouselIndex]}`;
  }

  ngAfterViewInit(): void {
    // Product Animation Logic -----------------------------
    let animationParent = this.elementRef.nativeElement.querySelector('.flex-animation') as HTMLElement;
    let animateContainers: HTMLElement[] = [];
    let animationPause: boolean = false;


    setTimeout(() => {
       animateContainers = Array.from(animationParent.children) as HTMLElement[];
       this.animationImages = Array.from(document.querySelectorAll('.flex-animation-product-img')) as HTMLImageElement[];
       addEventListenersToProductAnimation(this.animationImages);
    }, 500);
    //functions for Product Animation
    //SetUp Animation function
    function productFlow(){
      let initialOffset = 0;

      animateContainers.forEach((movingChild) => {
        movingChild.style.transform = `translateX(${initialOffset}px)`;
        initialOffset += movingChild.offsetWidth;
      });
    }
      //main animation function
      function frame(){
        let parentContainer = document.querySelector('.flex-animation') as HTMLElement;
        let containerWidth = parentContainer.offsetWidth;
        animateContainers.forEach((movingChild) => {
          const currentTransform = getComputedStyle(movingChild).transform;
          const matrix = new DOMMatrixReadOnly(currentTransform); //creates a matrix of all the transform on the element
          const currentTranslateX = matrix.m41; // this applies the currentTranslate to  the matrix, which affects the element. m41 is 4th column first row
          const speed = 1; //we can adjust speed here

          //moving each container to the left
          const newTranslateX = currentTranslateX - speed;
          movingChild.style.transform = `translateX(${newTranslateX}px)`;

          //check if off screen, if so we reposition to other side of screen
          if(newTranslateX + movingChild.offsetWidth < 0){
            //reposition
            const resetTranslateX = containerWidth - speed;
            movingChild.style.transform = `translateX(${resetTranslateX}px)`;
          }
        });

          if(!animationPause){
          requestAnimationFrame(frame);
          }
      }
      // adding listeners for animation images
    function addEventListenersToProductAnimation(animationImages: HTMLImageElement[]){
      //IIFE
      (function (movingChildren: HTMLImageElement[]){
        for(let child of movingChildren){
       child.addEventListener('mouseenter', () => {
            console.log('mouseenter working');
            child.style.transform = 'scale(1.1)';
            animationPause = true;
        });

        child.addEventListener('mouseleave', () => {
            console.log('mouseleave working');
            child.style.transform = 'scale(1)';
            animationPause = false;
            requestAnimationFrame(frame);
        });
      }
      })(animationImages);
      ///end IIFE
    }
    //End Animation Logic--------------------

    //event listener for product animation
    window.addEventListener('resize', handleResize);

    function handleResize(){
     productFlow();
    }
    //----------
    //calling functions, waiting for async data to load so function param are sufficient
    setTimeout(() => {
      productFlow();
      requestAnimationFrame(frame);
    },1000);
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}


