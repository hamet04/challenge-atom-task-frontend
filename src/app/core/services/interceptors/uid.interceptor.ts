import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const uid = authService.getUid()

  if (uid) {
    const authReq = req.clone({
      setHeaders: {
        uid: uid,
      }
    })
    return next(authReq)
  }
  
  return next(req);
};