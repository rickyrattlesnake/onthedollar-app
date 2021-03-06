import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfilesService, CreateProfileInput} from '../services/profiles/profiles.service';
import { AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { LoadingEventsService } from '../services/loading-events/loading-events.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent {

  profile: CreateProfileInput = {
    profileName: '',
    superPercentage: undefined,
    incomeAmount: undefined,
    incomeIncludesSuper: false,
    fiscalYear: 2019,
  };

  isLoading = false;

  constructor(
    public profilesService: ProfilesService,
    private router: Router,
    private route: ActivatedRoute,
    public notifier: MatSnackBar,
    private loadingService: LoadingEventsService
  ) {
  }

  onCancel(): void {
    this.isLoading = false;
    this.router.navigate(['../dashboard'], {
      relativeTo: this.route
    });
  }

  onSubmit(): void {
    const result = this.validateProfile(this.profile);

    if (!result.valid) {
      return this.notifyUser(result.error);
    }

    this.isLoading = true;
    this.loadingService.startLoading();
    this.profilesService.createProfile(this.profile)
      .subscribe(profileId => {
        this.router.navigate(['../dashboard'], {
          relativeTo: this.route
        });
        this.isLoading = false;
        this.loadingService.stopLoading();
      }, error => {
        console.error('[x] onSubmit ::', error);
        this.notifyUser(error.message);
        this.isLoading = false;
        this.loadingService.stopLoading();
      });
  }

  validateProfile(profile: CreateProfileInput): { error?: string, valid: boolean } {
    if (typeof profile.profileName !== 'string' || profile.profileName.length === 0) {
      return {
        valid: false,
        error: 'Please provide a profile name',
      };
    }

    if (typeof profile.superPercentage !== 'number' || profile.superPercentage < 9.5) {
      return {
        valid: false,
        error: 'Please provide a Superannuation percentage at 9.5% or more',
      };
    }

    if (typeof profile.incomeAmount !== 'number' || profile.incomeAmount <= 0) {
      return {
        valid: false,
        error: 'Please provide an Income amount above $0',
      };
    }

    if (typeof profile.fiscalYear !== 'number' || profile.fiscalYear <= 0) {
      return {
        valid: false,
        error: 'Tax year must be valid',
      };
    }

    return {
      valid: true,
    };
  }

  notifyUser(message: string) {
    this.notifier.open(message, '', {
      duration: 3000,
      panelClass: 'notification-error',
    });
  }
}
