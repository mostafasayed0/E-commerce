import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass , TranslateModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy{

  private readonly _AuthService=inject(AuthService)
  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _Router=inject(Router)
  SubscripeValue!:Subscription;

  confirem():boolean{
    if(this.registerForm.dirty)
    {
      return confirm('unSaved changes,Are you sure you want to leave?');
    }
    return true;
  }

  isLoading:boolean=false;
  messagesucsses:boolean=false;

  registerForm:FormGroup=this._FormBuilder.group({
    name:[null , [Validators.required , Validators.minLength(3) ,Validators.maxLength(20)]],
    email:[null ,[Validators.required , Validators.email]],
    password:[null ,[Validators.required,Validators.pattern(/^\w{6,}[@#$]/)]],
    rePassword:[null],
    phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]]
  } , {validators:this.repassValidation })

  // دى فايدتها لو عايز اضيف اكتر من customvalidation
  // {validators:[this.repassValidation , this.repassValidation]}

  // registerForm:FormGroup = new FormGroup({
  //   name: new FormControl(null , [Validators.required , Validators.minLength(3) ,Validators.maxLength(20)]),
  //   email: new FormControl(null ,[Validators.required , Validators.email]),
  //   password: new FormControl(null ,[Validators.required,Validators.pattern(/^\w{6,}[@#$]/)]),
  //   rePassword: new FormControl(null),
  //   phone: new FormControl(null ,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // } , this.repassValidation)

  // any ممكن استعمل النوع عادى
  // بس الافضل استعمل ده وبيمشل formgroup,formcontrol,formArray
  // مينفعش استعمل النوع formgroup لن ممكن استعمله على formcontrol
  repassValidation( g:AbstractControl )
  {
    if(g.get('password')?.value === g.get('rePassword')?.value)
    {
      return null;
    }
    else
    {
      return {mismatch:true}
    }
  }



  registersubmit():void
  {
    // هنا انا عملت كده عشان لو المستخدم راح عمل انسبكت وشال disabled
    // el form مش هتتبعت برضه غير لو كانت valid
    if(this.registerForm.valid)
    {
      this.isLoading=true;
      this.SubscripeValue= this._AuthService.SetRegister(this.registerForm.value).subscribe({
        next:(res)=>{
      if(res.message=='success')
      {
        this.messagesucsses=true;
        setTimeout(() => {
          // هنا بياخد array
          //عشان اول قيمه بيكون الrouting او page el htrohooo
          // تانى قيمة بيكون لو عتبعت داتا للصفحة
          //بس لازم قبلها / عشان الباس يكون فاضي مش متركم ع بعضه
          this._Router.navigate(['/login'])
        }, 1500);
      }
          this.isLoading=false;
        },
        error:(err:HttpErrorResponse)=>{
          this.isLoading=false;
        }
      })

    }
    else
    {
      // this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched()
    }

  }

  ngOnDestroy(): void {
    this.SubscripeValue?.unsubscribe();
  }
}



