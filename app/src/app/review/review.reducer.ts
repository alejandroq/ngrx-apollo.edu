import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Review } from './review.model';
import { ReviewActions, ReviewActionTypes } from './review.actions';

export interface State extends EntityState<Review> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Review> = createEntityAdapter<Review>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: ReviewActions
): State {
  switch (action.type) {
    case ReviewActionTypes.AddReview: {
      return adapter.addOne(action.payload.review, state);
    }

    case ReviewActionTypes.UpsertReview: {
      return adapter.upsertOne(action.payload.review, state);
    }

    case ReviewActionTypes.AddReviews: {
      return adapter.addMany(action.payload.reviews, state);
    }

    case ReviewActionTypes.UpsertReviews: {
      return adapter.upsertMany(action.payload.reviews, state);
    }

    case ReviewActionTypes.UpdateReview: {
      return adapter.updateOne(action.payload.review, state);
    }

    case ReviewActionTypes.UpdateReviews: {
      return adapter.updateMany(action.payload.reviews, state);
    }

    case ReviewActionTypes.DeleteReview: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ReviewActionTypes.DeleteReviews: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ReviewActionTypes.LoadReviews: {
      return adapter.addAll(action.payload.reviews, state);
    }

    case ReviewActionTypes.ClearReviews: {
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
