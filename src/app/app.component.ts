import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'onthedollar-app';

  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      this.openLoginDialog();
    }
  }

  openLoginDialog(): void {
    // todo: workaround for change detection cycle bug
    // https://github.com/angular/angular/issues/14748
    setTimeout(() => {
      this.dialog.open(LoginDialogComponent, {
          width: '600px',
          data: { title: 'Login' }
        })
        .componentInstance.event.subscribe(result => {
          console.log('[-] app.component :: login successful');
          this.router.navigateByUrl('/');
        });
    }, 0);
  }
}
