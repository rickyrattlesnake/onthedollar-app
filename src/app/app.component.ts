import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'onthedollar-app';

  constructor(
    public auth: AuthService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    console.log('ngOnInit :: app.component');
    if (!this.auth.isAuthenticated()) {
      console.log('ngOnInit :: app.component :: not authenticated');
      this.openLoginDialog();
      this.auth.login({ username: 'rattlesnake', password: 'tester' })
        .subscribe(() => {
          console.log('ngOnInit :: app.component :: logged in - rattlesnake');
        }, err => {
          console.error(err);
        });
    }
  }

  openLoginDialog(): void {
    let dialogRef = this.dialog
      .open(LoginDialogComponent, {
        width: '600px',
        data: { title: 'Login' }
      });

    dialogRef.componentInstance.event.subscribe(result => {
      console.log('[-] app.component :: event from login component')
    });
  }
}
