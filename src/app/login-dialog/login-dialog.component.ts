import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from '../services/auth/auth.service';

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
    public auth: AuthService
  ) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.auth.login({
        username: this.username,
        password: this.password
      })
    .subscribe(() => {
      console.log('[-] login success');
      this.event.emit({ success: true });
      this.dialogRef.close();
    }, error => {
      console.log('[-] login error');
      this.event.emit({ success: false });
      this.errorMessage = 'invalid username or password';
    });
  }
}
