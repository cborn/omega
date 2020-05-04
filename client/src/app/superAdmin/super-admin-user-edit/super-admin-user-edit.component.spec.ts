import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminUserEditComponent } from './super-admin-user-edit.component';

describe('SuperAdminUserEditComponent', () => {
  let component: SuperAdminUserEditComponent;
  let fixture: ComponentFixture<SuperAdminUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminUserEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
