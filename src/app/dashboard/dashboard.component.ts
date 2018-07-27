import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { Post } from '../Post';
import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';
import { ProfilesService } from '../services/profiles/profiles.service';

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


  displayedColumns = ['profileName', 'superAmount', 'grossIncome', 'taxAmount', 'netIncome', 'fiscalYear'];
  dataSource = new ProfileDataSource(this.profilesService);

  ngOnInit() {
  }

  openDialog(): void {
    console.log('[-] add income profile')
    // let dialogRef = this.dialog.open(PostDialogComponent, {
    //   width: '600px',
    //   data: 'Add Post'
    // });

    // dialogRef.componentInstance.event.subscribe(result => {
    //   this.dataService.addPost(result.data);
    //   this.dataSource = new ProfileDataSource(this.dataService);
    // });
  }

  deletePost(id) {
    if (this.authService.isAuthenticated()) {
      // this.dataService.deletePost(id);
      this.dataSource = new ProfileDataSource(this.profilesService);
    } else {
      alert('Login in Before');
    }
  }
}

export class ProfileDataSource extends DataSource<any> {
  constructor(private profilesService: ProfilesService) {
    super();
  }

  connect() {
    return this.profilesService.getAllIncomeProfilesForCurrentUser();
  }

  disconnect() {
  }
}
