import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChoiceRendererComponent } from './multi-choice-renderer.component';

describe('MultiChoiceRendererComponent', () => {
  let component: MultiChoiceRendererComponent;
  let fixture: ComponentFixture<MultiChoiceRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiChoiceRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiChoiceRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
