import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/Interfaces/iproducts';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [CarouselModule , TranslateModule],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss',
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  sub: Subscription | null = null;
  private _ActivatedRoute = inject(ActivatedRoute);
  private _ToastrService = inject(ToastrService);
  private _CartService = inject(CartService);
  private readonly _ProductsService = inject(ProductsService);
  SpecificProduct: Iproduct | null = null;
  ngOnInit() {
    this.sub = this._ActivatedRoute.params.subscribe({
      next: (params) => {
        let idValue = params['id'];
        this._ProductsService.getSpicificProducts(idValue).subscribe({
          next: (res) => {
            this.SpecificProduct = res.data;
          }
        });
      },
    });
  }

  addTocart(id: string): void {
    this._CartService.AddToCart(id).subscribe({
      next: (res) => {
        this._CartService.cartNumber.set(res.numOfCartItems);
        console.log(res);
        if (res.status === 'success') {
          this._ToastrService.success(res.message, 'Success')
        }
      }
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    smartSpeed: 1000,
    autoplay: true,
    rtl: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    items: 1,
    nav: false,
  };

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

