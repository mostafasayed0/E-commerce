import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loadingscreenInterceptor: HttpInterceptorFn = (req, next) => {
  let _NgxSpinnerService=inject(NgxSpinnerService)

  _NgxSpinnerService.show()


  return next(req).pipe(finalize( ()=>{
    _NgxSpinnerService.hide()
  } ) )
};
