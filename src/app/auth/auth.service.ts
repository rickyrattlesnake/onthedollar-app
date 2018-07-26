import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(): void {
    this.handleAuthentication()
      .subscribe(jwtToken => {
        console.log('[-] auth.service :: jwtToken', jwtToken);

        this.setSession({
          expiresIn: 300,
          idToken: 'fakeId',
          accessToken: 'fakeAccessToken',
        });
      });
  }

  handleAuthentication(): Observable<string> {
    return of('json.web.token');
  }


  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }



  private setSession({
    expiresIn,
    accessToken,
    idToken,
  }): void {
    const expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
}
