import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTextRendererComponent } from './long-text-renderer.component';

describe('LongTextRendererComponent', () => {
  let component: LongTextRendererComponent;
  let fixture: ComponentFixture<LongTextRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongTextRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTextRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
