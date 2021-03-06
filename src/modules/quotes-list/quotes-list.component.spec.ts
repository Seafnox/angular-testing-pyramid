import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {PageObject} from '@utils/test/pageObject';
import {QuotesListComponent} from '@modules/quotes-list/quotes-list.component';
import {QuotesListModule} from '@modules/quotes-list/quotes-list.module';
import {quotesMock} from '@mocks/qoutes.mock';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {BlankComponent, BlankModule} from '@utils/test/blank.component';

describe('QuotesListComponent - quotes list component', () => {
  const [firstQuote] = quotesMock;

  let fixture: ComponentFixture<QuotesListComponent>;
  let component: QuotesListComponent;
  let pageObject: PageObject<QuotesListComponent>;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BlankModule,
        QuotesListModule,
        RouterTestingModule.withRoutes([{
          path: 'quote/:id',
          component: BlankComponent
        }])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesListComponent);
    component = fixture.componentInstance;
    pageObject = new PageObject<QuotesListComponent>(fixture);
    location = TestBed.get(Location);

    component.quotes = quotesMock;

    fixture.detectChanges();
  });

  it('Count of displayed quotes matches the input data', () => {
    const quotesList = pageObject.getElementsBySelector('.quote-item');

    expect(quotesList.length).toBe(
      quotesMock.length,
      'Count of displayed quotes is not matches'
    );
  });

  it('Text of first quote is correct', () => {
    const quoteText = pageObject.getElementBySelector('.quote-text');

    expect(pageObject.getElementText(quoteText)).toBe(
      firstQuote.text,
      'Text of first quote is not correct'
    );
  });

  it('Author of first quote is correct', () => {
    const quoteAuthor = pageObject.getElementBySelector('.quote-author');

    expect(pageObject.getElementText(quoteAuthor)).toBe(
      firstQuote.author,
      'Author of first quote is not correct'
    );
  });

  it('First quote item have link to its page', fakeAsync(() => {
    pageObject.triggerClick('a');

    tick();

    expect(location.path()).toBe(
      `/quote/${firstQuote.id}`,
      'Current path is not matches with quote path'
    );
  }));
});
