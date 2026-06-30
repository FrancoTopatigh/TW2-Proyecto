import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser();

  // Verifico que esté logueado y que su rol sea ADMIN
  if (authService.isAuthenticated() && user?.role === 'ADMIN') {
    return true;
  }

  // Si es USER o no está logueado, lo mandamos al Home
  router.navigate(['/']);
  return false;
};
