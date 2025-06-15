import { Component, inject, OnInit } from '@angular/core';
import { log } from 'console';
import { jwtDecode } from 'jwt-decode';
import { Userdata } from '../../core/Interfaces/userdata';
import { PaymentService } from '../../core/services/payment.service';
import { UserOrders } from '../../user-orders';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe , CurrencyPipe ,TranslateModule],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private _PaymentService = inject(PaymentService);
  userData!: Userdata | any;
  Details:UserOrders[]=[];
  ngOnInit(): void {
    this.userData = jwtDecode(localStorage.getItem('userToken')!);
    console.log(this.userData?.id);

    this._PaymentService.getuserorders(this.userData?.id).subscribe({
      next: (res) => {
        console.log(res);

        this.Details=res;
      },
    });

  }
}
