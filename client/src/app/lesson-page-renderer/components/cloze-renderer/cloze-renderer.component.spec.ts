import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClozeRendererComponent } from './cloze-renderer.component';

describe('ClozeRendererComponent', () => {
  let component: ClozeRendererComponent;
  let fixture: ComponentFixture<ClozeRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClozeRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClozeRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
