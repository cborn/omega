import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureChoiceRendererComponent } from './picture-choice-renderer.component';

describe('PictureChoiceRendererComponent', () => {
  let component: PictureChoiceRendererComponent;
  let fixture: ComponentFixture<PictureChoiceRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureChoiceRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureChoiceRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
