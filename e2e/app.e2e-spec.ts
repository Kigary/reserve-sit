import { ReserveSitPage } from './app.po';

describe('reserve-sit App', () => {
  let page: ReserveSitPage;

  beforeEach(() => {
    page = new ReserveSitPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
