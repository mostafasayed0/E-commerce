import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Userdata } from '../Interfaces/userdata';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private _HttpClient: HttpClient) {}
  baseUrl:string='https://ecommerce.routemisr.com';
  myHeaders:any={token:localStorage.getItem('userToken')}


  cheackout(id: string|null, shippingDetails:object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        shippingAddress: shippingDetails
      }

    )
  }

  getuserorders(userid:string | Userdata):Observable<any>
  {
    return this._HttpClient.get(
      `${this.baseUrl}/api/v1/orders/user/${userid}`
    );
  }
}
