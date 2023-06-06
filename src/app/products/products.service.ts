import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  SERVER_URL: string = 'http://localhost:8080/api';

  getProducts():Observable<Products[]> {
    return this.http.get<Products[]>(`${this.SERVER_URL}/products`);
  }

}
