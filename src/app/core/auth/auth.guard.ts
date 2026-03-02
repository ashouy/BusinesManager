import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = ():
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree> => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  return auth.checkAndRefreshToken().pipe(
    map((valid) => {
      if (valid) {
        return true;
      }

      return router.createUrlTree(['/login']);
    })
  );
};

export const guestGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return router.createUrlTree(['/']);
  }

  return true;
};

