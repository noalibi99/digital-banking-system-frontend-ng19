import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {catchError, throwError} from 'rxjs';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = (authService as any)?.accessToken;

  const newReq = req.clone({
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
  });

  return next(newReq).pipe(
    catchError(err => {
      if (err.status === 401) {
        authService.logout();
      }
      return throwError(err.message);
    })
  );
};
