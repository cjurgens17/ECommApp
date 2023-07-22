import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../products/cart';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewCartService {

  private apiUrl = 'http://localhost:4242';

  constructor(private http: HttpClient) { }

  toStripe(cart: Cart):  Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.http.post<any>(`${this.apiUrl}/create-checkout-session`,cart, httpOptions)
    .pipe(
      tap(resp => console.log('resp',resp)),
      catchError((err) => {
        console.error('error occured during HTTP POST request:', err);
        throw err;
      })
    );
  }
}
