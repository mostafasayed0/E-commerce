import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
// export class LoginComponent {
// loginform:FormGroup= new FormGroup({
//   email:new FormControl(null , [Validators.required , Validators.email]),
//   password:new FormControl(null , [Validators.required,Validators.pattern(/^\w{8,}[@#$]/)])
// })
export class LoginComponent implements OnDestroy {
  isLoading: boolean = false;
  SubscripeValue!: Subscription;
  showPassword: boolean = false;

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  loginform: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}[@#$]/)]],
  });

  send() {
    this.isLoading = true;
    if (this.loginform.valid) {
      this.SubscripeValue = this._AuthService
        .SetLogin(this.loginform.value)
        .subscribe({
          next: (res) => {
            if (res.message == 'success') {
              setTimeout(() => {
                localStorage.setItem('userToken', res.token);
                this._AuthService.saveUserData();
                this._Router.navigate(['/home']);
              }, 1000);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.isLoading = false;
          },
        });
    } else {
      this.loginform.markAllAsTouched();
      this.isLoading = false;
    }
  }
  ngOnDestroy(): void {
    this.SubscripeValue?.unsubscribe();
  }
}




