import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import jwt_decode, { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;

    if (Date.now() > expirationTime) {
      // Ideally, token refresh should happen in Interceptor
      // Guard can just logout if token already expired and refresh token is also not available
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        // Let Interceptor handle refreshing (because user will make an API call)
        return true;
      }

      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      router.navigate(['/login']);
      return false;
    }

    return true; // Token is valid
  } catch (error) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    router.navigate(['/login']);
    return false;
  }
};

