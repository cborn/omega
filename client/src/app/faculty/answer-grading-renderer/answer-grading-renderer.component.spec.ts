import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerGradingRendererComponent } from './answer-grading-renderer.component';

describe('AnswerGradingRendererComponent', () => {
  let component: AnswerGradingRendererComponent;
  let fixture: ComponentFixture<AnswerGradingRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerGradingRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerGradingRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
