import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleRendererComponent } from './scale-renderer.component';

describe('ScaleRendererComponent', () => {
  let component: ScaleRendererComponent;
  let fixture: ComponentFixture<ScaleRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaleRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaleRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
