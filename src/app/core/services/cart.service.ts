import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseurl: string = 'https://ecommerce.routemisr.com';
  myheader: any = { token: localStorage.getItem('userToken') };
  private _HttpClient = inject(HttpClient);
  cartNumber:WritableSignal<number>=signal(0)

  AddToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${this.baseurl}/api/v1/cart`, {
      productId: id,
    });
  }

  getItems(): Observable<any> {
    return this._HttpClient.get(`${this.baseurl}/api/v1/cart`);
  }

  deletItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseurl}/api/v1/cart/${id}`);
  }

  UpdateCountNumber(id: string, countNumber: number): Observable<any> {
    return this._HttpClient.put(`${this.baseurl}/api/v1/cart/${id}`, {
      count: countNumber,
    });
  }

  ClearAll(): Observable<any> {
    return this._HttpClient.delete(`${this.baseurl}/api/v1/cart`);
  }
}
