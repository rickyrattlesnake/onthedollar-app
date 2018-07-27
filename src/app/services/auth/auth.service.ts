import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const authApi = `${environment.apiBaseUrl}/auth`;

interface ApiPostSession {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }

  login({ username, password }) {
    const url = `${authApi}/session`;

    return this.http.post<ApiPostSession>(url, { username, password })
      .pipe(
        map(event => {
          this.setSession({ accessToken: event.token });
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token != null && token !== '';
  }

  private setSession({
    accessToken,
  }): void {
    localStorage.setItem('access_token', accessToken);
  }
}
