import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EventType as AuthEventType, AuthService } from '../services/auth/auth.service';
import { ProfilesService, Profile } from '../services/profiles/profiles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles-view',
  templateUrl: './profiles-view.component.html',
  styleUrls: ['./profiles-view.component.css']
})
export class ProfilesViewComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public profilesService: ProfilesService) { }


  displayedColumns = [
    'profileName',
    'superAmount',
    'grossIncome',
    'taxAmount',
    'netIncome',
    'fiscalYear',
    'delete'
  ];
  // dataSource: ProfileDataSource | null = null;
  profiles: Profile[] = [];

  trackProfiles(index: number, profile: Profile) {
    return profile.profileId;
  }

  ngOnInit() {
    this.authService.events
      .subscribe(evt => {
        if (evt === AuthEventType.LOGIN) {
          // this.dataSource = new ProfileDataSource(this.profilesService);
          this.getProfiles();
        }

        if (evt === AuthEventType.LOGOUT) {
          // this.dataSource = null;
          this.profiles = [];
        }
      });

    // this.dataSource = new ProfileDataSource(this.profilesService);
    this.getProfiles();

  }

  isProfileCollectionEmpty() {
    return this.profiles.length === 0;
  }

  deleteProfile(profileId) {
    this.profilesService.deleteProfile(profileId)
      .subscribe(() => {
        // this.dataSource = new ProfileDataSource(this.profilesService);
        this.getProfiles();
      });
  }

  getProfiles(): void {
    this.profilesService.getAllIncomeProfilesForCurrentUser()
      .subscribe(profiles => {
        debugger;
        this.profiles = profiles;
      }, error => {
        debugger;
        this.profiles = [];
      });
  }


}

//
