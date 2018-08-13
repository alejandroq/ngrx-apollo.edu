import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HeroActionTypes, UpsertHeros } from './hero.actions';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { List } from 'immutable';
import gql from 'graphql-tag';


@Injectable()
export class HeroEffects {

  constructor(private actions$: Actions, private apollo: Apollo) { }

  @Effect()
  LoadHeros$ = this.actions$.pipe(
    ofType(HeroActionTypes.LoadHeros),
    switchMap(() => this.apollo.query({
      query: gql`
      fragment CharacterFragment on Character {
        id
        name
      }

      query GetHeroes {
        newHope: hero(episode: NEWHOPE){
          ...CharacterFragment
        }
        empire: hero(episode: EMPIRE){
          ...CharacterFragment
        }
        jedi: hero(episode: JEDI){
          ...CharacterFragment
        }
      }
      `,
    })),
    map(({ data }: { data: any }) => {
      // TODO given CORS issue during this quick instantiation,
      // the contents of the response object may differ slightly -
      // as in untested at the moment. -AQ 120818
      if (data) {
        const {
          GetHeroes: { newHope, empire, jedi }
        } = data;

        // massage data into Heroes Model
        return new UpsertHeros({ heros: List([newHope, empire, jedi]).map(({ id, name }) => ({ id, name })).toArray() });
      }
      // No data received, propogate error for handling elsewhere.
      throw Error();
    }),
    // Catching error will keep the Effect's pipeline from exiting (would be very bad).
    catchError(err => of(`Error: ${err}`))
  );
}
