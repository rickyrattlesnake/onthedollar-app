import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Post } from '../Post';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { ProfilesService } from '../services/profiles/profiles.service';
import { CreateProfileDialogComponent } from '../create-profile-dialog/create-profile-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public profilesService: ProfilesService,
    public dialog: MatDialog) { }


  displayedColumns = [
    'profileName',
    'superAmount',
    'grossIncome',
    'taxAmount',
    'netIncome',
    'fiscalYear',
    'delete'
  ];
  dataSource = new ProfileDataSource(this.profilesService);

  ngOnInit() {
  }

  openCreateProfileDialog(): void {
    console.log('[-] add income profile')
    let dialogRef = this.dialog.open(CreateProfileDialogComponent, {
      width: '600px',
      data: { title: 'Create Income Profile' }
    });

    dialogRef.componentInstance.event.subscribe(result => {
      this.dataSource = new ProfileDataSource(this.profilesService);
    });
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
