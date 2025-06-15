import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  private _FormBuilder = inject(FormBuilder);
  private _ActivatedRoute = inject(ActivatedRoute);
  private _PaymentService = inject(PaymentService);
  CartId: string | null = '';

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe({
      next: (params) => {
        this.CartId = params['id'];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  userInformation: FormGroup = this._FormBuilder.group({
    details: [null, Validators.required],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: [null, Validators.required],
  });

  CheckOut(): void {
    if (this.userInformation.valid) {
      this._PaymentService
        .cheackout(this.CartId, this.userInformation.value)
        .subscribe({
          next: (res) => {
            console.log(res);

            if (res.status === 'success') {
              window.open(res.session.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.userInformation.markAllAsTouched();
    }
  }
}
