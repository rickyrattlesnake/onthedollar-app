import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfileDialogComponent } from './create-profile-dialog.component';

describe('CreateProfileDialogComponent', () => {
  let component: CreateProfileDialogComponent;
  let fixture: ComponentFixture<CreateProfileDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProfileDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
