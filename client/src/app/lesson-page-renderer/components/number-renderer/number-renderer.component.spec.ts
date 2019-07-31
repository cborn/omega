import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRendererComponent } from './number-renderer.component';

describe('NumberRendererComponent', () => {
  let component: NumberRendererComponent;
  let fixture: ComponentFixture<NumberRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
