import { Component, EventEmitter, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfilesService } from '../services/profiles/profiles.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent {

  profile = {
    profileName: '',
    superPercentage: undefined,
    incomeAmount: undefined,
    incomeIncludesSuper: false,
    fiscalYear: 2019,
  };

  public event: EventEmitter<any> = new EventEmitter();

  constructor(
    public profilesService: ProfilesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  onCancel(): void {
    this.router.navigate(['../dashboard'], {
      relativeTo: this.route
    });
  }

  onSubmit(): void {
    this.profilesService.createProfile(this.profile)
      .subscribe(profileId => {
        this.event.emit({ newProfileId: profileId });
        this.router.navigate(['../dashboard'], {
          relativeTo: this.route
        });
      })
  }
}
