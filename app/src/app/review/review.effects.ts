import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ReviewActionTypes, AddReview } from './review.actions';
import { switchMap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable()
export class ReviewEffects {

  constructor(private actions$: Actions, private apollo: Apollo) { }

  @Effect()
  AddReviewOrigin$ = this.actions$.pipe(
    ofType(ReviewActionTypes.AddReview),
    switchMap((action: AddReview) => {
      return this.apollo.mutate({
        mutation: gql`
          mutation CreateReview {
            createReview(episode: NEWHOPE, review: {stars: 0, commentary: "Terrible"}) {
              stars
              commentary
            }
          }`,
        variables: {
          episode: action.payload.review.episode,
          review: {
            stars: action.payload.review.stars,
            commentary: action.payload.review.commentary,
          }
        }
      });
    })
    // Could have mapped response and stored locally, but instead - if user
    // posts a review locally, regardless of it successfully posting online,
    // they will see it in their UI. No further side effects required.
  );
}
