import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';
import { AbstractControl } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent {

  username = '';
  password = '';
  errorMessage = '';

  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public loginData: any,
    public auth: AuthService,
    private userService: UserService
  ) {
  }

  close(): void {
    this.dialogRef.close();
  }

  registerUser(username: AbstractControl, password: AbstractControl) {
    this.setGlobalError('');
    if (this.validateCredentials(username, password)) {
      return this.userService.registerUser(username.value, password.value)
        .pipe(
          flatMap(evt => {
            return this.auth.login({
              username: this.username,
              password: this.password
            });
          }),
        )
        .subscribe(() => {
          this.event.emit({ success: true });
          this.dialogRef.close();
        }, error => {
          console.error('[x] registerUser ::', error);
        });
    }

  }

  loginUser(username: AbstractControl, password: AbstractControl) {
    this.setGlobalError('');
    if (this.validateCredentials(username, password)) {
      return this.auth.login({
          username: this.username,
          password: this.password
        })
        .subscribe(() => {
          this.event.emit({ success: true });
          this.dialogRef.close();
        }, error => {
          console.error('[x] loginUser ::', error);
          this.setGlobalError('Incorrect Username or Password');
        });
    }
  }

  validateCredentials(username: AbstractControl, password: AbstractControl) {
    return username.valid &&
      password.valid &&
      username.dirty &&
      password.dirty;
  }

  setGlobalError(message: string) {
    this.errorMessage = message;
  }

  hasGlobalError() {
    return this.errorMessage !== '';
  }
}
