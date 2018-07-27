import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProfilesService } from '../services/profiles/profiles.service';

@Component({
  selector: 'app-create-profile-dialog',
  templateUrl: './create-profile-dialog.component.html',
  styleUrls: ['./create-profile-dialog.component.css']
})
export class CreateProfileDialogComponent {

  profile = {
    profileName: '',
    superPercentage: 0,
    incomeAmount: 0,
    incomeIncludesSuper: false,
    fiscalYear: 2018,
  };

  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<CreateProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public profilesService: ProfilesService,
  ) {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.profilesService.createProfile(this.profile)
      .subscribe(profileId => {
        this.event.emit({ newProfileId: profileId });
        this.dialogRef.close();
      })
  }
}
