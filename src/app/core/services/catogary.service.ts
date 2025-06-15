import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatograyService {
  constructor() {}
  private readonly _HttpClient = inject(HttpClient);
  baseurl: string = 'https://ecommerce.routemisr.com';

  GetAllCatogray(): Observable<any> {
    return this._HttpClient.get(`${this.baseurl}/api/v1/categories`);
  }

  // GetSpecificCatogray(id:string): Observable<any>{
  //   return this._HttpClient.get(
  //     `${this.baseurl}/api/v1/categories/${id}`
  //   );
  // }


}
