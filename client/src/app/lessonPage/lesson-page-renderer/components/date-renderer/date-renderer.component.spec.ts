import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRendererComponent } from './date-renderer.component';

describe('DateRendererComponent', () => {
  let component: DateRendererComponent;
  let fixture: ComponentFixture<DateRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
