import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuotesResolver} from '@router/resolvers/quotes.resolver';
import {QuoteResolver} from '@router/resolvers/quote.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: '@modules/quotes/quotes.module#QuotesModule',
    resolve: {
      quotes: QuotesResolver
    }
  },
  {
    path: 'quote/:id',
    loadChildren: '@modules/quote-page/quote-page.module#QuotePageModule',
    resolve: {
      quote: QuoteResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }