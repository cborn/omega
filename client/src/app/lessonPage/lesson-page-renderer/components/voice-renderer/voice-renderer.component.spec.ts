import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceRendererComponent } from './voice-renderer.component';

describe('VoiceRendererComponent', () => {
  let component: VoiceRendererComponent;
  let fixture: ComponentFixture<VoiceRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
