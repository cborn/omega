import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAlertCreateComponent } from './super-admin-alert-create.component';

describe('SuperAdminUserEditComponent', () => {
  let component: SuperAdminAlertCreateComponent;
  let fixture: ComponentFixture<SuperAdminAlertCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminAlertCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminAlertCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
