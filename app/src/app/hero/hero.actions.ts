import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Hero } from './hero.model';

export enum HeroActionTypes {
  LoadHeros = '[Hero] Load Heros',
  AddHero = '[Hero] Add Hero',
  UpsertHero = '[Hero] Upsert Hero',
  AddHeros = '[Hero] Add Heros',
  UpsertHeros = '[Hero] Upsert Heros',
  UpdateHero = '[Hero] Update Hero',
  UpdateHeros = '[Hero] Update Heros',
  DeleteHero = '[Hero] Delete Hero',
  DeleteHeros = '[Hero] Delete Heros',
  ClearHeros = '[Hero] Clear Heros'
}

export class LoadHeros implements Action {
  readonly type = HeroActionTypes.LoadHeros;

  constructor(public payload: { heros: Hero[] }) {}
}

export class AddHero implements Action {
  readonly type = HeroActionTypes.AddHero;

  constructor(public payload: { hero: Hero }) {}
}

export class UpsertHero implements Action {
  readonly type = HeroActionTypes.UpsertHero;

  constructor(public payload: { hero: Hero }) {}
}

export class AddHeros implements Action {
  readonly type = HeroActionTypes.AddHeros;

  constructor(public payload: { heros: Hero[] }) {}
}

export class UpsertHeros implements Action {
  readonly type = HeroActionTypes.UpsertHeros;

  constructor(public payload: { heros: Hero[] }) {}
}

export class UpdateHero implements Action {
  readonly type = HeroActionTypes.UpdateHero;

  constructor(public payload: { hero: Update<Hero> }) {}
}

export class UpdateHeros implements Action {
  readonly type = HeroActionTypes.UpdateHeros;

  constructor(public payload: { heros: Update<Hero>[] }) {}
}

export class DeleteHero implements Action {
  readonly type = HeroActionTypes.DeleteHero;

  constructor(public payload: { id: string }) {}
}

export class DeleteHeros implements Action {
  readonly type = HeroActionTypes.DeleteHeros;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearHeros implements Action {
  readonly type = HeroActionTypes.ClearHeros;
}

export type HeroActions =
 LoadHeros
 | AddHero
 | UpsertHero
 | AddHeros
 | UpsertHeros
 | UpdateHero
 | UpdateHeros
 | DeleteHero
 | DeleteHeros
 | ClearHeros;
