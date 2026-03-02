import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // Avoid recursion on the refresh endpoint itself.
  if (req.url.includes('/auth/refresh')) {
    return next(req);
  }

  // For HttpOnly cookie-based auth we don't need to touch the request; the
  // browser will automatically send the cookie.
  return next(req).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Try to refresh the session once. If the token is still valid, the
        // backend will refresh it and we retry the original request.
        return auth.checkAndRefreshToken().pipe(
          switchMap((valid) => {
            if (valid) {
              return next(req);
            }

            // Session is expired; AuthService already handled clearing state
            // and showing the toast.
            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
};

