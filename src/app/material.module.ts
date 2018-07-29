import { NgModule } from '@angular/core';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatExpansionModule
} from '@angular/material';

const modulesToExport = [
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatExpansionModule,
];

@NgModule({
  imports: modulesToExport,
  exports: modulesToExport,
})
export class MaterialModule {}
