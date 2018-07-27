import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const usersApi = `${environment.apiBaseUrl}/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  registerUser(username: string, password: string) {
    const url = `${usersApi}`;

    return this.http.post<void>(url, { username, password });
  }

}
