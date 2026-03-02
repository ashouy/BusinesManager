import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { delay, of, tap, map, catchError } from 'rxjs';
import { ToastService } from '../toast/toast.service';

export type AuthUser = {
  name: string;
  email: string;
};

type AuthResponse = {
  token: string;
  user: AuthUser;
};

const USER_KEY = 'bm_auth_user';
const TOKEN_REFRESH_URL = '/api/auth/refresh';

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

    // When you have a real backend, replace this mock with:
    // return this.http
    //  .post<AuthResponse | null>(TOKEN_REFRESH_URL, {})
    //  .pipe( ... );

    const mockResponse: AuthResponse | null = {
      token: 'mock-refresh-token',
      user: currentUser,
    };

    return of(mockResponse).pipe(
      tap((response) => {
        if (response && response.token) {
          window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
          this._user.set(response.user);
        } else {
          this.handleExpiredSession();
        }
      }),
      map((response) => !!(response && response.token)),
      catchError(() => {
        this.handleExpiredSession();
        return of(false);
      })
    );
  }

  login(credentials: { login: string; senha: string }) {
    // In a real backend flow, this would POST to an auth endpoint and the
    // server would set an HttpOnly, Secure cookie with the JWT. The client
    // never stores the token, only the user info for convenience.
    //
    // Example real call:
    // return this.http.post<AuthResponse>('/api/auth/login', credentials).pipe(
    //   tap((response) => {
    //     window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
    //     this._user.set(response.user);
    //   })
    // );

    // Mocked backend response with a fake JWT and user payload.
    const mockResponse: AuthResponse = {
      token: 'mock-jwt-token.' + btoa(credentials.login) + '.signature',
      user: {
        name: credentials.login || 'Usuário',
        email: `${credentials.login || 'user'}@example.com`,
      },
    };

    return of(mockResponse).pipe(
      delay(500),
      tap((response) => {
        window.localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        this._user.set(response.user);
      })
    );
  }

  logout(): void {
    // In a real backend flow, you would typically also notify the server so it
    // can clear the HttpOnly cookie, e.g. POST /api/auth/logout.
    window.localStorage.removeItem(USER_KEY);
    this._user.set(null);
    this.router.navigate(['/login']);
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

