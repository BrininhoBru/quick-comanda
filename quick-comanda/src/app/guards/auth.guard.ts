import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const AuthGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);

  return new Promise((resolve) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(true);
      } else {
        router.navigate(['/login']);
        resolve(false);
      }
    });
  });
};