import { HttpClient } from '@angular/common/http';
import {  inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { Userdata } from '../Interfaces/userdata';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _HttpClient = inject(HttpClient);
  baseurl: string = 'https://ecommerce.routemisr.com';
  private _Router=inject(Router)
  userData!: Userdata|null;

  SetRegister(data: object): Observable<any> {
    return this._HttpClient.post(`${this.baseurl}/api/v1/auth/signup`, data);
  }

  SetLogin(datasign: object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseurl}/api/v1/auth/signin`,
      datasign
    );
  }

  saveUserData(): void {
    if (localStorage.getItem('userToken') !== null) {
      // ! ده هنا حل عشان اضمنله ان فى داتا جاية
      // رغم انى متاكد انى ف داتا عشان االكوندشن بس الباكج عايزة تطمن
      this.userData = jwtDecode(localStorage.getItem('userToken')!);
      console.log(this.userData);
    }
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login'])
    console.log(this.userData);
  }

  VerifyEmail(data:object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseurl}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  VerifyCode(data:object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseurl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  ResetPassword(data:object): Observable<any> {
    return this._HttpClient.put(
      `${this.baseurl}/api/v1/auth/resetPassword`,
      data
    );
  }



}
