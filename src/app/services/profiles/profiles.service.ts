import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const profilesApi = `${environment.apiBaseUrl}/profiles`;

export interface Profile {
  profileId: string;
  profileName: string;
  superAmount: number;
  grossIncome: number;
  taxAmount: number;
  netIncome: number;
  fiscalYear: number;
}

export interface CreateProfileInput {
  profileName: string;
  superPercentage: number;
  incomeAmount: number;
  incomeIncludesSuper: boolean;
  fiscalYear: number;
}

export interface CreateProfileResponse {
  profileId: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private http: HttpClient) { }

  getAllIncomeProfilesForCurrentUser() {
    const url = `${profilesApi}/income`;
    return this.http.get<Profile[]>(url)
      .pipe(
        catchError(err => {
          if (err.status === 404) {
            return of([]);
          }
          throwError(err);
        })
      );
  }

  deleteProfile(profileId: string) {
    const url = `${profilesApi}/income/${profileId}`;
    return this.http.delete<void>(url);
  }

  createProfile(profile: CreateProfileInput) {
    const url = `${profilesApi}/income`;
    return this.http.post<CreateProfileResponse>(url, profile);
  }
}
