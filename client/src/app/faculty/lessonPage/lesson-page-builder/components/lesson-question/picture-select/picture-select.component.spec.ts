import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureSelectComponent } from './picture-select.component';

describe('PictureSelectComponent', () => {
  let component: PictureSelectComponent;
  let fixture: ComponentFixture<PictureSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
