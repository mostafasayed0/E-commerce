import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/Interfaces/iproducts';
import { Subscription } from 'rxjs';
import { CatograyService } from '../../core/services/catogary.service';
import { Category } from '../../core/Interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { CurrencyPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    TermtextPipe,
    FormsModule,
    UpperCasePipe,
    CurrencyPipe,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  keysesrch: string = '';
  products: WritableSignal<Iproduct[]> = signal([]);
  Categorylist: WritableSignal<Category[]> = signal([]);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CatograyService = inject(CatograyService);
  private readonly _CartService = inject(CartService);
  private _Toastr = inject(ToastrService);
  private _Router = inject(Router);

  SubscribeValue!: Subscription;
  CatograySubscribeValue!: Subscription;

  allProducts: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];
  showCount = 12;

  images: string[] = [
    './assets/imges2/pexels-sid-cam-photography-330592-978249.jpg',
    './assets/imges2/large-blogbannerzralien.webp',
    './assets/imges2/pexels-coppertist-wu-313365563-16003885.jpg',
    './assets/imges2/pexels-cottonbro-10599961.jpg',
    './assets/imges2/pexels-cottonbro-4427642.jpg',
    './assets/imges2/pexels-hngstrm-2547007.jpg',
    './assets/imges2/pexels-kish-1488463.jpg',
    './assets/imges2/pexels-max-fischer-5872348.jpg',
    './assets/imges2/pexels-paulseling-20385205.jpg',
    './assets/imges2/pexels-pixabay-207456.jpg',
    './assets/imges2/pexels-pixabay-220137.jpg',
    './assets/imges2/pexels-pixabay-264636.jpg',
    './assets/imges2/pexels-shvetsa-3962285.jpg',
    './assets/imges2/pexels-soulful-pizza-2080276-3780681.jpg',
    './assets/imges2/pexels-yankrukov-9069289.jpg',
    './assets/imges2/pexels-zeleboba-1706694.jpg',
    './assets/imges2/happy-couple-window-shopping-wintertime.jpg',
  ];

  ngOnInit(): void {
    this.CatograySubscribeValue = this._CatograyService
      .GetAllCatogray()
      .subscribe({
        next: (res) => {
          this.Categorylist.set(res.data);
        },
      });

    this.SubscribeValue = this._ProductsService.getAllproducts().subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.filteredProducts = [...this.allProducts];
        this.products.set(res.data);
      },
    });
  }

  applySearch() {
    const term = this.keysesrch?.toLowerCase() ?? '';
    this.filteredProducts = this.allProducts.filter(
      (item) =>
        item.title.toLowerCase().includes(term) ||
        item.category.name.toLowerCase().includes(term)
    );
    this.showCount = 12;
  }

  loadMore() {
    this.showCount += 12;
  }

  addproducttocart(id: string): void {
    this._CartService.AddToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this._CartService.cartNumber.set(res.numOfCartItems);
          this._Toastr.success(res.message, 'Success', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            closeButton: true,
            positionClass: 'toast-bottom-right',
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.SubscribeValue?.unsubscribe();
    this.CatograySubscribeValue?.unsubscribe();
  }

  getId(id: string) {
    this._Router.navigate(['/item-details', id]);
  }

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    smartSpeed: 1000,
    rtl: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    smartSpeed: 2000,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
}


