import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {


  public slides = [
    {
      src: 'https://images.unsplash.com/photo-1536914629078-6fda32a00cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29mZmVlJTIwcG93ZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
    },
    {
      src: 'https://media.istockphoto.com/id/627331730/photo/successful-middle-age-businessman.webp?b=1&s=170667a&w=0&k=20&c=5irIXSfOtmUQrQLH18gLiUP7lgsghRD_OvgjdGrVLAQ='
    },
    {
      src: 'https://media.istockphoto.com/id/1414977595/photo/woman-stir-coffee-with-coffee-spoon-coffee-cup-hot-drink-in-a-mug-beige-and-marble-background.webp?b=1&s=170667a&w=0&k=20&c=1N2xzyo7raTnkLarL2Rzw_JbZ7UN8L6q1sBSIy_OjLY='
    }
  ];


}
