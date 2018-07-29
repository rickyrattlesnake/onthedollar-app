import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingEventsService } from '../loading-events/loading-events.service';

const authApi = `${environment.apiBaseUrl}/auth`;

interface ApiPostSession {
  token: string;
}

export enum EventType {
  LOGIN,
  LOGOUT
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  events = new EventEmitter<EventType>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingEventsService) { }

  login({ username, password }) {
    const url = `${authApi}/session`;

    return this.http.post<ApiPostSession>(url, { username, password })
      .pipe(
        tap(event => {
          this.setSession({ accessToken: event.token });
          this.events.emit(EventType.LOGIN);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    // preemptive turn off loading
    this.loadingService.stopLoading();
    this.events.emit(EventType.LOGOUT);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return token != null && token !== '';
  }

  getSessionToken() {
    const token = localStorage.getItem('access_token');
    return token != null && token !== '' ? token : null;
  }

  private setSession({
    accessToken,
  }): void {
    localStorage.setItem('access_token', accessToken);
  }
}
