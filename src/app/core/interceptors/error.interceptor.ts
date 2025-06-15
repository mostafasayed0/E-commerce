import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
 let _ToastrService = inject(ToastrService);

  return next(req).pipe(catchError((err)=>{
    // logic with errors

    _ToastrService.error(err.error.message,'Error');


  return throwError(()=>err)
  }) )
};
