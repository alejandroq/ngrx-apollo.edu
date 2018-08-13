import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromHero from './hero/hero.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HeroEffects } from './hero/hero.effects';

import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import {
  NgrxCacheModule,
  NgrxCache,
  apolloReducer
} from 'apollo-angular-cache-ngrx';
import { ApolloLink, Operation } from 'apollo-link';

import { ReviewEffects } from './review/review.effects';
import * as fromReview from './review/review.reducer';
import { ReviewFormComponent } from './review-form/review-form.component';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ReviewFormComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    StoreModule.forRoot(
      { ...reducers, apollo: apolloReducer },
      { metaReducers }
    ),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature('hero', fromHero.reducer),
    StoreModule.forFeature('review', fromReview.reducer),
    EffectsModule.forRoot([HeroEffects]),
    EffectsModule.forFeature([ReviewEffects]),
    NgrxCacheModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private ngrxCache: NgrxCache
  ) {
    const middleware = new ApolloLink(
      (operation: Operation, forward: any): any => {
        // If you were handling authentication, adding headers, etc
        const token = localStorage.getItem('access_token');
        if (token && !environment.production) {
          operation.setContext({
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
          });
        }
        return forward(operation);
      }
    );

    const http = this.httpLink.create({ uri: environment.gqlURL });
    this.apollo.create({
      link: middleware.concat(http),
      cache: this.ngrxCache.create({}),

      // Further caching options
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only',
          errorPolicy: 'ignore',
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
      },
    });
  }
}
