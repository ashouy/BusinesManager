import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { of, tap, map, catchError, throwError } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { API_CONFIG } from '../config/api.config';

export type AuthUser = {
  name: string;
  email: string;
};

type AuthResponse = {
  token: string;
  user: AuthUser;
};

const USER_KEY = 'bm_auth_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _user = signal<AuthUser | null>(this.loadUserFromStorage());

  readonly user = this._user.asReadonly();

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly toastService: ToastService
  ) {}

  isAuthenticated(): boolean {
    return !!this._user();
  }

  checkAndRefreshToken() {
    const currentUser = this._user();

    if (!currentUser) {
      return of(false);
    }

    // POST to backend refresh endpoint. The server validates the token from the cookie
    // and sets a new one if still valid.
    return this.http.post<AuthResponse | null>(API_CONFIG.auth.refresh, { }, { withCredentials: true }).pipe(
      tap((response) => {
        if (response && response.user) {
          window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
          this._user.set(response.user);
        } else {
          this.handleExpiredSession();
        }
      }),
      map((response) => !!(response && response.user)),
      catchError(() => {
        this.handleExpiredSession();
        return of(false);
      })
    );
  }

  login(credentials: { login: string; senha: string }) {
    // POST to backend auth endpoint. The server sets an HttpOnly, Secure cookie
    // with the JWT. The client stores only the user info in localStorage for UI convenience.
    return this.http.post<AuthResponse>(API_CONFIG.auth.login, credentials, { withCredentials: true }).pipe(
      tap((response) => {
        if (response && response.user) {
          window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
          this._user.set(response.user);
          this.toastService.show('Login bem-sucedido', 'info');
        }
      }),
      catchError((error) => {
        if (error.status === 401) {
          this.toastService.show('Credenciais inválidas', 'error');
        } else {
          this.toastService.show('Erro ao fazer login. Tente novamente.', 'error');
        }
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    // POST to backend logout endpoint to clear the HttpOnly cookie,
    // then clear local state and navigate to login.
    this.http.post(API_CONFIG.auth.logout, {}, { withCredentials: true }).subscribe({
      next: () => {
        window.localStorage.removeItem(USER_KEY);
        this._user.set(null);
        this.toastService.show('Logout bem-sucedido', 'info');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Even if logout fails, clear local state and redirect
        console.error('Erro ao fazer logout', err);
        window.localStorage.removeItem(USER_KEY);
        this._user.set(null);
        this.router.navigate(['/login']);
      }
    });
  }

  private handleExpiredSession(): void {
    window.localStorage.removeItem(USER_KEY);
    this._user.set(null);

    this.toastService.show('Expired Session', 'error');
    this.router.navigate(['/login']);
  }

  private loadUserFromStorage(): AuthUser | null {
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      return null;
    }
  }
}

