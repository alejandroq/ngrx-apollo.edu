import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Hero } from './hero.model';
import { HeroActions, HeroActionTypes } from './hero.actions';

export interface State extends EntityState<Hero> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: HeroActions
): State {
  switch (action.type) {
    case HeroActionTypes.AddHero: {
      return adapter.addOne(action.payload.hero, state);
    }

    case HeroActionTypes.UpsertHero: {
      return adapter.upsertOne(action.payload.hero, state);
    }

    case HeroActionTypes.AddHeros: {
      return adapter.addMany(action.payload.heros, state);
    }

    case HeroActionTypes.UpsertHeros: {
      return adapter.upsertMany(action.payload.heros, state);
    }

    case HeroActionTypes.UpdateHero: {
      return adapter.updateOne(action.payload.hero, state);
    }

    case HeroActionTypes.UpdateHeros: {
      return adapter.updateMany(action.payload.heros, state);
    }

    case HeroActionTypes.DeleteHero: {
      return adapter.removeOne(action.payload.id, state);
    }

    case HeroActionTypes.DeleteHeros: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case HeroActionTypes.LoadHeros: {
      return adapter.addAll(action.payload.heros, state);
    }

    case HeroActionTypes.ClearHeros: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
