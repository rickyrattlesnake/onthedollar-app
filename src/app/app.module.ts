import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AppRouters } from './app.routes';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './http-interceptors';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ProfilesViewComponent } from './profiles-view/profiles-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginDialogComponent,
    CreateProfileComponent,
    ProfilesViewComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRouters,
    FormsModule,
    HttpClientModule,
  ],
  entryComponents: [
    LoginDialogComponent,
    CreateProfileComponent,
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
