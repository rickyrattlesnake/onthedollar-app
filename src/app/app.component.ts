import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { Router } from '@angular/router';
import { LoadingEventsService, LoadingState } from './services/loading-events/loading-events.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'onthedollar-app';

  showProgressBar = false;

  constructor(
    public auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private loadingService: LoadingEventsService) {
  }

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      this.openLoginDialog();
    }

    this.loadingService.events.subscribe(event => {
      if (event === LoadingState.LOADING) {
        this.showProgressBar = true;
      } else {
        this.showProgressBar = false;
      }
    });
  }

  openLoginDialog(): void {
    // todo: workaround for change detection cycle bug
    // https://github.com/angular/angular/issues/14748
    setTimeout(() => {
      this.dialog.open(LoginDialogComponent, {
          width: '400px',
          data: { title: 'Login' }
        })
        .componentInstance.event.subscribe(result => {
          console.log('[-] app.component :: login successful');
          this.router.navigateByUrl('/');
        });
    }, 0);
  }
}
