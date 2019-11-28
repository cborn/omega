import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminSiteEditComponent } from './super-admin-site-edit.component';

describe('SuperAdminSiteEditComponent', () => {
  let component: SuperAdminSiteEditComponent;
  let fixture: ComponentFixture<SuperAdminSiteEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminSiteEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminSiteEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
