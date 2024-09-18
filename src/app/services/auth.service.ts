import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { UserCredentials } from '../models/user-credentials';
import { UserInfo } from '../models/user-info';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5289/api/account'; // Reemplaza con la URL de tu API
  private tokenKey = 'authToken';

  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Método para iniciar sesión y almacenar el JWT
  login(credentials: UserCredentials): Observable<boolean> {
    return this.http.post<UserInfo>(`${this.apiUrl}/login`, credentials).pipe(
      map((response) => {
        if (this.isBrowser) {
          localStorage.setItem(this.tokenKey, response.token);
        }
        this.router.navigate(['/home']);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    if (this.isBrowser) {
      const token = localStorage.getItem(this.tokenKey);
      return !!token; // Retorna true si hay un token
    }
    return false; // Retorna false si no está en el navegador
  }

  // Método para cerrar sesión
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
      this.router.navigate(['/login']);
    }
  }

  // Método para obtener el token JWT del localStorage
  getToken(): any {
    if (this.isBrowser) {
      return localStorage.getItem(this.tokenKey);
    }
  }
}
