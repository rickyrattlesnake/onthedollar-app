import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';
import { AbstractControl } from '@angular/forms';
import { UserService } from '../services/user/user.service';

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
    if (this.validateCredentials(username, password)) {
      this.userService.registerUser(username.value, password.value)
        .subscribe(() => {
          this.event.emit({ success: true });
          this.dialogRef.close();
        }, error => {
          console.log('[-] login error');
          this.errorMessage = 'invalid username or password';
        });
    }

  }

  loginUser(username: AbstractControl, password: AbstractControl) {
    if (this.validateCredentials(username, password)) {
      this.auth.login({
          username: this.username,
          password: this.password
        })
        .subscribe(() => {
          this.event.emit({ success: true });
          this.dialogRef.close();
        }, error => {
          console.log('[-] login error');
          this.event.emit({ success: false });
          this.errorMessage = 'invalid username or password';
        });
    }
  }

  validateCredentials(username: AbstractControl, password: AbstractControl) {
    return username.valid &&
      password.valid &&
      username.dirty &&
      password.dirty;
  }
}
