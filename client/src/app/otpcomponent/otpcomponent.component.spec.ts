import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OTPComponentComponent } from './otpcomponent.component';

describe('OTPComponentComponent', () => {
  let component: OTPComponentComponent;
  let fixture: ComponentFixture<OTPComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OTPComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OTPComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
