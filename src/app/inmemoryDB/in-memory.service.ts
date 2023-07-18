import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {

  constructor() { }

   createDb() {

    let products = [
     { id: 1, name: `Chock full o' Nuts`, price: 9.99, image: 'https://m.media-amazon.com/images/I/81TBeTikHhL._AC_UL400_.jpg', quantity: 15, altImage: 'https://m.media-amazon.com/images/I/818na+MgHtL._SX679_.jpg'},
     { id: 2, name: 'LavAzza', price: 19.99, image: 'https://m.media-amazon.com/images/I/319vKG87sOL._AC_UL400_.jpg', quantity: 5, altImage: 'https://m.media-amazon.com/images/I/51PoeLDKKyL.jpg'},
     { id: 3, name: 'Amazon Fresh Colombia', price: 14.99, image: 'https://m.media-amazon.com/images/I/71AkGIlaV7L._SY679_.jpg', quantity: 4, altImage: 'https://m.media-amazon.com/images/I/81gcF-SEGpL._SY679_.jpg'},
     { id: 4, name: 'San Francisco Bay Coffee', price: 39.99, image: 'https://m.media-amazon.com/images/I/6188yisrDIS._SX679_.jpg', quantity: 30, altImage:'https://m.media-amazon.com/images/I/71RwqoFEN6L._SX679_.jpg'},
     { id: 5, name: 'Brooklyn Coffee', price: 24.99, image: 'https://m.media-amazon.com/images/I/51AiNsmZKKL._SX679_.jpg', quantity: 70, altImage:'https://m.media-amazon.com/images/I/51wBzE4F0GL.jpg'},
     { id: 6, name: 'Copper Moon Coffee', price: 24.99, image: 'https://m.media-amazon.com/images/I/41yg1mHVV1L._SX300_SY300_QL70_FMwebp_.jpg', quantity: 20, altImage:'https://m.media-amazon.com/images/I/51g8POijSEL._SX679_.jpg'},
     { id: 7, name: 'Folgers Classic Roast', price: 19.99, image: 'https://m.media-amazon.com/images/I/71vq4xH7szL._AC_SX679_.jpg', quantity: 50, altImage:'https://m.media-amazon.com/images/I/317qgbpHGlL._AC_.jpg'},
     { id: 8, name: 'Maxwell House', price: 14.99, image: 'https://m.media-amazon.com/images/I/91AUkleiqPL._AC_UL400_.jpg', quantity: 3, altImage:'https://m.media-amazon.com/images/I/91qPz5I9v8L._SX679_.jpg'},
     { id: 9, name: 'Caribou Coffee', price: 29.99, image: 'https://m.media-amazon.com/images/I/61Ek-53xyFL._AC_UL400_.jpg', quantity: 89, altImage:'https://m.media-amazon.com/images/I/71tdFQSDZEL._SX679_.jpg'},
     { id: 10, name: 'Dunkin Original Blend', price: 11.99, image: 'https://m.media-amazon.com/images/I/71wkHYqWOgL._AC_UL400_.jpg', quantity: 7, altImage:'https://m.media-amazon.com/images/I/71pwIY881dL._SX679_.jpg'},
    ];

    let advertisedProducts = [
      { id: 11, name: 'Valhalla Java', price: 10.99, image: 'https://m.media-amazon.com/images/I/61BnSZMLBvL._SX679_.jpg', altImage: 'https://m.media-amazon.com/images/I/714EN0WLKOL._SX679_.jpg'},
     { id: 12, name: 'Kicking Horse', price: 20.99, image: 'https://m.media-amazon.com/images/I/61FTRgES9yL._SX679_.jpg', altImage: 'https://m.media-amazon.com/images/I/71j9EVleRLL._SX679_.jpg'},
     {id: 13, name: 'Jims Organic Coffee', price: 30.99, image:'https://m.media-amazon.com/images/I/61Dsz0kpbWL._SX679_.jpg', altImage: 'https://m.media-amazon.com/images/I/613XZLFH+bL._SX679_.jpg'},
     { id: 6, name: 'Copper Moon Coffee', price: 24.99, image: 'https://m.media-amazon.com/images/I/41yg1mHVV1L._SX300_SY300_QL70_FMwebp_.jpg', quantity: 20, altImage:'https://m.media-amazon.com/images/I/51g8POijSEL._SX679_.jpg'},
     { id: 5, name: 'Brooklyn Coffee', price: 24.99, image: 'https://m.media-amazon.com/images/I/51AiNsmZKKL._SX679_.jpg', quantity: 70, altImage:'https://m.media-amazon.com/images/I/51wBzE4F0GL.jpg'}

    ];


    let awardProducts = [
      { id: 1, name: `Chock full o' Nuts`, price: 9.99, image: 'https://m.media-amazon.com/images/I/81TBeTikHhL._AC_UL400_.jpg', quantity: 15, altImage: 'https://m.media-amazon.com/images/I/818na+MgHtL._SX679_.jpg'},
      { id: 2, name: 'LavAzza', price: 19.99, image: 'https://m.media-amazon.com/images/I/319vKG87sOL._AC_UL400_.jpg', quantity: 6, altImage: 'https://m.media-amazon.com/images/I/51PoeLDKKyL.jpg'},
      { id: 3, name: 'Amazon Fresh Colombia', price: 14.99, image: 'https://m.media-amazon.com/images/I/71AkGIlaV7L._SY679_.jpg', quantity: 4, altImage: 'https://m.media-amazon.com/images/I/81gcF-SEGpL._SY679_.jpg'},
    ];

    let coldBrew = [
      { id: 14, name: `Bizzy Organic Cold Brew Coffee`, price: 12.99, image: 'https://m.media-amazon.com/images/I/71iJbtnINAL._AC_UL400_.jpg', quantity: 10, altImage: 'https://m.media-amazon.com/images/I/71P7qumwVxL._SX679_.jpg', type:"bottle"},
      { id: 15, name: `Tronco 16 oz glass Tumbler`, price: 15.99, image: 'https://m.media-amazon.com/images/I/61VnlnKfILS._AC_SX522_.jpg', quantity: 15, altImage: 'https://m.media-amazon.com/images/I/61IbRFxdDjS._AC_SX522_.jpg', type:"blend"}
    ]

    return {products, advertisedProducts, awardProducts, coldBrew};
  }
}
