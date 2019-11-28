import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminSiteCreateComponent } from './super-admin-site-create.component';

describe('SuperAdminSiteCreateComponent', () => {
  let component: SuperAdminSiteCreateComponent;
  let fixture: ComponentFixture<SuperAdminSiteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperAdminSiteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminSiteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
