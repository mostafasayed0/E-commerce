import { Component, computed, effect, inject, OnInit, Renderer2, Signal, ViewChild, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss',
})
export class NavMainComponent implements OnInit {
  @ViewChild('cartElement') cartElement!: ElementRef;
  private _AuthService = inject(AuthService);
  private _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);
  private _CartService = inject(CartService);
  CartNumbers: Signal<number> = computed(() => this._CartService.cartNumber());

  constructor(private _Renderer: Renderer2) {
    effect(() => {
      if (this.CartNumbers() > 5) {
          this._Renderer.addClass(
            this.cartElement.nativeElement,
            'text-danger'
          );
      }
      else{
          this._Renderer.removeClass(
            this.cartElement.nativeElement,
            'text-danger'
          );
      }
    });
  }

  ngOnInit(): void {
    this._CartService.getItems().subscribe({
      next: (data) => {
        this._CartService.cartNumber.set(data.numOfCartItems);
      },
    });
  }

  out(): void {
    this._AuthService.logout();
  }

  chooselang(lang: string): void {
    this._MyTranslateService.setLanguage(lang);
  }
}
