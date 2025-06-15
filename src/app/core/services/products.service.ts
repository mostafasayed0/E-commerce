import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
  baseurl: string = 'https://ecommerce.routemisr.com';
  private readonly _HttpClient = inject(HttpClient);

  getAllproducts():Observable<any>{
    return this._HttpClient.get(`${this.baseurl}/api/v1/products`);
  }

  getSpicificProducts(id:string):Observable<any>
  {
     return this._HttpClient.get(
       `${this.baseurl}/api/v1/products/${id}`
     );
  }
}
