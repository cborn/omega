import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveStatusComponent } from './save-status.component';

describe('SaveStatusComponent', () => {
  let component: SaveStatusComponent;
  let fixture: ComponentFixture<SaveStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
