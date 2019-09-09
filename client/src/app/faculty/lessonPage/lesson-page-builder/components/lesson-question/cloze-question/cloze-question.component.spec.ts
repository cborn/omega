import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClozeQuestionComponent } from './cloze-question.component';

describe('ClozeQuestionComponent', () => {
  let component: ClozeQuestionComponent;
  let fixture: ComponentFixture<ClozeQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClozeQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClozeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
