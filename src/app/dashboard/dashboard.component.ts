import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EventType as AuthEventType, AuthService } from '../services/auth/auth.service';
import { ProfilesService } from '../services/profiles/profiles.service';
import { CreateProfileComponent } from '../create-profile/create-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public profilesService: ProfilesService,
    private router: Router, ) { }


  displayedColumns = [
    'profileName',
    'superAmount',
    'grossIncome',
    'taxAmount',
    'netIncome',
    'fiscalYear',
    'delete'
  ];
  dataSource: ProfileDataSource | null = null;

  ngOnInit() {
    this.authService.events
      .subscribe(evt => {
        if (evt === AuthEventType.LOGIN) {
          this.dataSource = new ProfileDataSource(this.profilesService);
        }

        if (evt === AuthEventType.LOGOUT) {
          this.dataSource = null;
        }
      });

    this.dataSource = new ProfileDataSource(this.profilesService);
  }

  deleteProfile(profileId) {
    this.profilesService.deleteProfile(profileId)
      .subscribe(() => {
        this.dataSource = new ProfileDataSource(this.profilesService);
      });
  }
}

export class ProfileDataSource extends DataSource<any> {
  constructor(private profilesService: ProfilesService) {
    super();
  }

  connect() {
    return this.profilesService.getAllIncomeProfilesForCurrentUser()
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            return [];
          }
          throw error;
        })
      );
  }

  disconnect() {
  }
}
