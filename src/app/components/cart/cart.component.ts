import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/Interfaces/icart';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, TranslateModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cartItems:WritableSignal<Icart> = signal({} as Icart);
  private _CartService = inject(CartService);
  private _Router = inject(Router);
  private _ToastrService = inject(ToastrService);

  ngOnInit(): void {
    this._CartService.getItems().subscribe({
      next: (res) => {

        this.cartItems.set(res.data);
      },
    });
  }

  DeletItem(deleteId: string): void {
    this._CartService.deletItem(deleteId).subscribe({
      next: (res) => {
        // عشان الحذف يسمع فى html
        this._CartService.cartNumber.set(res.numOfCartItems);

        this.cartItems.set(res.data);
      },
    });
  }

  UpdateCount(id: string, count: number): void {
    // عشان لو المستخدم وصل 0 او اقل من 0 مش هيتنفذ
    if (count > 0) {
      this._CartService.UpdateCountNumber(id, count).subscribe({
        next: (res) => {
          this.cartItems.set(res.data);
          console.log(res);
        },
      });
    }
  }

  ClearItems(): void {
    this._CartService.ClearAll().subscribe({
      next: (res) => {
        this.cartItems.set({} as Icart);


        if (res.message == 'success') {
          this._CartService.cartNumber.set(0);
          this._ToastrService.warning(
            localStorage.getItem('lang') == 'ar'
              ? 'تم مسح جميع العناصر'
              : 'All items have been deleted'
          );
        }
      },
    });
  }

  gotopay(id: string): void {
    this._Router.navigate(['/orders', id]);
  }
}

