import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortTextRendererComponent } from './short-text-renderer.component';

describe('ShortTextRendererComponent', () => {
  let component: ShortTextRendererComponent;
  let fixture: ComponentFixture<ShortTextRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortTextRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortTextRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
