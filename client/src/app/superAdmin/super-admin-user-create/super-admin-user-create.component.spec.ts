import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminUserCreateComponent } from './super-admin-user-create.component';

describe('SuperAdminUserEditComponent', () => {
  let component: SuperAdminUserCreateComponent;
  let fixture: ComponentFixture<SuperAdminUserCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminUserCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
