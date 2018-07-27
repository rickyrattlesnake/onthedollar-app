import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const profilesApi = `${environment.apiBaseUrl}/profiles`;

export interface Profile {
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
    return this.http.get<Profile[]>(url);
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
