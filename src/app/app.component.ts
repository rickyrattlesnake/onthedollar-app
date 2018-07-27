import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'onthedollar-app';

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
    console.log('ngOnInit :: app.component');
    if (!this.auth.isAuthenticated()) {
      console.log('ngOnInit :: app.component :: not authenticated');
      this.auth.login({ username: 'rattlesnake', password: 'tester' })
        .subscribe(() => {
          console.log('ngOnInit :: app.component :: logged in - rattlesnake');
        }, err => {
          console.error(err);
        });
    }
  }
}
