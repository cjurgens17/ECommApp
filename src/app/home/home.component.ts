import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Product } from '../products/products';
import { ProductsService } from '../products/products.service';
import { Subject, takeUntil } from 'rxjs';
import { ViewProductService } from '../view-product/view-product.service';
import { Router } from '@angular/router';
import { CarouselObjectImage } from './carouselobjectimage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  animationImages: HTMLImageElement[] = [];
  carouselElement!: HTMLElement;
  carouselImage!: HTMLImageElement;
  carouselIndex: number = 0;
  colorIndex: number = 0;
  advertisedProducts!: Product[];
  private ngUnSubscribe = new Subject<void>();

  carouselColors: string[] = [
    'hsl(165.56,79.41%,47.33%, 1)',
    'hsl(50.48,96.6%,53.92%,1)',
    '#FF8DBD',
  ];
  products!: Product[];
  carouselObjects: CarouselObjectImage[] = [
    {
      image:
        "assets/static/images/organic tested.avif",
      subtitle: 'Organically Tested',
      id: 0,
    },
    {
      image:
        'assets/static/images/team planning.avif',
      subtitle: 'Team Planning',
      id: 1,
    },
    {
      image:
        'assets/static/images/factory roasted.avif',
      subtitle: 'Factory Roasted',
      id: 2,
    },
    {
      image:
        'assets/static/images/Harvesting.avif',
      subtitle: 'Harvest Season',
      id: 3,
    },
  ];

  featuredCarouselObjects: CarouselObjectImage[] = [
    {
      image:
        'assets/static/images/factory roasted.avif',
      subtitle: 'Factory Roasted',
      id: 0,
    },
    {
      image:
        'assets/static/images/team planning.avif',
      subtitle: 'Team Planning',
      id: 1,
    },
    {
      image:
        'assets/static/images/organic tested.avif',
      subtitle: 'Organically Tested',
      id: 2,
    },
  ];

  constructor(
    private productService: ProductsService,
    private elementRef: ElementRef,
    private viewProductService: ViewProductService,
    private router: Router
  ) {}

  passProduct(product: Product) {
    this.viewProductService.swappingProductSubject(product);
    this.router.navigate(['/viewproduct']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  scrollToTop() {
    window.scroll(0, 0);
  }
  //for carousel-----------------------------------------
  rotateLeft() {
    let filteredImages: CarouselObjectImage[] = [];
    let length = this.carouselObjects.length - 1;

    this.featuredCarouselObjects.filter((obj, i) => {
      if (obj.id === length) {
        filteredImages[i] = this.carouselObjects[0];
      } else {
        filteredImages[i] = this.carouselObjects[obj.id + 1];
      }
      return filteredImages;
    });
    this.featuredCarouselObjects = filteredImages;
  }

  rotateRight() {
    let filteredImages: CarouselObjectImage[] = [];
    let zero = 0;

    this.featuredCarouselObjects.filter((obj, i) => {
      if (obj.id === zero) {
        filteredImages[i] =
          this.carouselObjects[this.carouselObjects.length - 1];
      } else {
        filteredImages[i] = this.carouselObjects[obj.id - 1];
      }
      return filteredImages;
    });
    this.featuredCarouselObjects = filteredImages;
  }

  //----end of carousel

  ////Lifecycle Hooks
  ngOnInit(): void {
    this.productService
      .getAdvertisedProducts()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe({
        next: (products) => {
          this.advertisedProducts = products;
        },
        error: (err) => console.log(`Error: ${err}`),
      });

    //calling the carousel so animations fall into place
    this.rotateRight();
  }

  ngAfterViewInit(): void {
    // Product Animation Logic -----------------------------
    let animationParent = this.elementRef.nativeElement.querySelector(
      '.flex-animation'
    ) as HTMLElement;
    let animateContainers: HTMLElement[] = [];
    let animationPause: boolean = false;

    setTimeout(() => {
      animateContainers = Array.from(animationParent.children) as HTMLElement[];
      this.animationImages = Array.from(
        document.querySelectorAll('.flex-animation-product-img')
      ) as HTMLImageElement[];
      addEventListenersToProductAnimation(this.animationImages);
    }, 500);
    //functions for Product Animation
    //SetUp Animation function
    function productFlow() {
      let initialOffset = 0;

      animateContainers.forEach((movingChild) => {
        movingChild.style.transform = `translateX(${initialOffset}px)`;
        initialOffset += movingChild.offsetWidth;
      });
    }
    //main animation function
    function frame() {
      let parentContainer = document.querySelector(
        '.flex-animation'
      ) as HTMLElement;
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
        if (newTranslateX + movingChild.offsetWidth < 0) {
          //reposition
          const resetTranslateX = containerWidth - speed;
          movingChild.style.transform = `translateX(${resetTranslateX}px)`;
        }
      });

      if (!animationPause) {
        requestAnimationFrame(frame);
      }
    }
    // adding listeners for animation images
    function addEventListenersToProductAnimation(
      animationImages: HTMLImageElement[]
    ) {
      //IIFE
      (function (movingChildren: HTMLImageElement[]) {
        for (let child of movingChildren) {
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

    function handleResize() {
      productFlow();
    }
    //----------
    //calling functions, waiting for async data to load so function param are sufficient
    setTimeout(() => {
      productFlow();
      requestAnimationFrame(frame);
    }, 1000);
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
