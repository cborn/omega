import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanRendererComponent } from './boolean-renderer.component';

describe('BooleanRendererComponent', () => {
  let component: BooleanRendererComponent;
  let fixture: ComponentFixture<BooleanRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooleanRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
