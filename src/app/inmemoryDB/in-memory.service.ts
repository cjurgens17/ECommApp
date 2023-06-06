import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';


@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {

  constructor() { }

   createDb() {
    
    let products = [
     { id: 1, name: 'Shock', price: 10},
     { id: 1, name: 'Chlorine Tablets', price: 20},
     { id: 1, name: 'Pool Pole', price: 10},
     { id: 1, name: 'Skimmer Net', price: 25},
     { id: 1, name: 'Chemical Test Strips', price: 40},
    ];

    let service = [
      {id: 1, name: 'Pool Opening', price: 275},
      {id: 2, name: 'Pool Closing', price: 275},
      {id: 3, name: 'Power Vacuum', price: 95},
      {id: 4, name: 'Service Call', price: 250},
    ]

    return {products, service};
  }
}
