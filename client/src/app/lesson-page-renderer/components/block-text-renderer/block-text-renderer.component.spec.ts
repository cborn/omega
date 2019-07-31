import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTextRendererComponent } from './block-text-renderer.component';

describe('BlockTextRendererComponent', () => {
  let component: BlockTextRendererComponent;
  let fixture: ComponentFixture<BlockTextRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTextRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTextRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
