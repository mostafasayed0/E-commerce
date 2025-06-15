import { Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { logGuard } from './core/guards/log.guard';
import { outGuard } from './core/guards/out.guard';
import { AuthlayoutComponent } from './layouts/authlayout/authlayout.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { confiremGuard } from './core/guards/confirem.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthlayoutComponent,
    canActivate: [outGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'register',
        canDeactivate: [confiremGuard],
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./components/forgetpassword/forgetpassword.component').then(
            (m) => m.ForgetpasswordComponent
          ),
        title: 'forget password',
      },
    ],
  },
  {
    path: '',
    component: MainlayoutComponent,
    canActivate: [logGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'Shopping Cart',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'brands',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'all orders',
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./components/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
        title: 'orders',
      },
      {
        path: 'item-details/:id',
        loadComponent: () =>
          import('./components/item-details/item-details.component').then(
            (m) => m.ItemDetailsComponent
          ),
        title: 'details',
      },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'not found' },
];
