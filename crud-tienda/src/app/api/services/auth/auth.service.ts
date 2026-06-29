import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Usuario } from '../../../modules/usuarios/interface/usuario.interface';
import { LoginResponse } from '../../../modules/usuarios/interface/login.interface';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly apiUrl = environment.API_URL;

  private readonly currentUserSignal = signal<Usuario | null>(null);
  private readonly isAuthenticatedSignal = signal<boolean>(this.hasToken());

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();

  constructor() {
    if (this.hasToken()) {
      this.getProfile().subscribe({
        error: () => this.clearSession(),
      });
    }
  }

  hasToken(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem(TOKEN_KEY);
  }

  setSession(res: LoginResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    this.currentUserSignal.set(res.usuario);
    this.isAuthenticatedSignal.set(true);
  }

  private clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);
  }

  registrar(data: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/auth/signup`, data);
  }

  login(email: string, contrasena: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/signin`, { email, contrasena });
  }

  getProfile(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/auth/me`).pipe(
      tap((usuario) => {
        this.currentUserSignal.set(usuario);
        this.isAuthenticatedSignal.set(true);
      })
    );
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/']);
  }
}
