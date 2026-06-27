import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token =
    typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
