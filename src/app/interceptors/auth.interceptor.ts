import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private router = inject(Router);
  private http = inject(HttpClient);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token might be expired → Try refresh
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            return this.http.post<any>('https://localhost:7006/api/Account/refresh-token', { refreshToken }).pipe(
              switchMap(response => {
                localStorage.setItem('token', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);

                // Retry the original request with new token
                const clonedReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${response.accessToken}` }
                });
                return next.handle(clonedReq);
              }),
              catchError(err => {
                // Refresh token failed → Logout
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                this.router.navigate(['/login']);
                return throwError(() => err);
              })
            );
          } else {
            // No refresh token → Logout
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            this.router.navigate(['/login']);
          }
        }

        return throwError(() => error);
      })
    );
  }
}
