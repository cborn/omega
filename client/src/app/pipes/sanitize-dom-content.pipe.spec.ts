import { SanitizeDomContentPipe } from './sanitize-dom-content.pipe';

describe('SanitizeDomContentPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeDomContentPipe();
    expect(pipe).toBeTruthy();
  });
});
