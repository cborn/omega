import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermIndexComponent } from './term-index.component';

describe('TermIndexComponent', () => {
  let component: TermIndexComponent;
  let fixture: ComponentFixture<TermIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
