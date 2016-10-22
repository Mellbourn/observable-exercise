import { browser, element, by } from 'protractor';

export class ObservableExercisePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('obs-root h1')).getText();
  }
}
