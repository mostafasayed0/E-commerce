import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  isLoading: boolean = false;
  Emailmsg: string = '';
  Codemsg: string = '';
  Restmsg: string = '';
  step: number = 1;
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  ForgetForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  });

  CodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\w{2,}$/)]],
  });

  ResetPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [
      null,
      [Validators.required, Validators.pattern(/^\w{6,}[@#$]/)],
    ],
  });

  call(): void {
    this.isLoading = true;
    let emailValue= this.ForgetForm.get('email')?.value;
    this.ResetPasswordForm.get('email')?.patchValue(emailValue);
    this._AuthService.VerifyEmail(this.ForgetForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.Emailmsg = res.message;
        this.isLoading = false;
        if (res.statusMsg === 'success') {
          this.step += 1;
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  call2(): void {
    this.isLoading = true;
    this._AuthService.VerifyCode(this.CodeForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.Codemsg = res.status;
        this.isLoading = false;
        if (res.status === 'Success') {
          this.step += 1;
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  call3(): void {
    this.isLoading = true;
    this._AuthService.ResetPassword(this.ResetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.Restmsg = res.message;
        this.isLoading = false;
        localStorage.setItem('userToken', res.token);
        this._AuthService.saveUserData();
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
