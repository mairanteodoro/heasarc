import { HeasarcPage } from './app.po';

describe('heasarc App', function() {
  let page: HeasarcPage;

  beforeEach(() => {
    page = new HeasarcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
