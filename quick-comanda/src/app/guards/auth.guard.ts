import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { toObservable } from '@angular/core/rxjs-interop';

export const AuthGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return toObservable(authService.isLoading).pipe(
    filter(isLoading => !isLoading),
    take(1),
    map(() => {
      const isAuthenticated = !!authService.currentUser();
      const isLoginRoute = state.url === '/login';

      if (isAuthenticated) {
        if (isLoginRoute) {
          return router.createUrlTree(['/tabs/home']);
        }
        return true;
      } else {
        if (isLoginRoute) {
          return true;
        }
        return router.createUrlTree(['/login']);
      }
    })
  );
};
