import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PitchRenderComponent } from './pitch-render.component';

describe('PitchRenderComponent', () => {
  let component: PitchRenderComponent;
  let fixture: ComponentFixture<PitchRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PitchRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PitchRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
