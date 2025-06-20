import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if( localStorage.getItem('userToken') !== null)
  {
    // includes('https://ecommerce.routemisr.com/api/v1/cart') ممكن احط url كله  || kelmaa momyzaaaa
    if (req.url.includes('cart') || req.url.includes('orders')) {
      req = req.clone({
        setHeaders: { token: localStorage.getItem('userToken')! },
      });
    }

  }
  return next(req);
};
