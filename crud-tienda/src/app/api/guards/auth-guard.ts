import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifico que el usuario esté logueado
  if (authService.isAuthenticated()) {
    return true;
  }

  // Si no está logueado, lo redirigimos al login
  router.navigate(['/auth/signin']);
  return false;
};
