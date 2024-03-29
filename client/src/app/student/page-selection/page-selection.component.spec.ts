import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSelectionComponent } from './page-selection.component';

describe('CourseSelectionComponent', () => {
  let component: PageSelectionComponent;
  let fixture: ComponentFixture<PageSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
