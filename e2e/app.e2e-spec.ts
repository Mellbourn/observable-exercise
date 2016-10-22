import { ObservableExercisePage } from './app.po';

describe('observable-exercise App', function() {
  let page: ObservableExercisePage;

  beforeEach(() => {
    page = new ObservableExercisePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('obs works!');
  });
});
