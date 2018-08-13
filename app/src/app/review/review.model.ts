export enum Episode {
  NEW_HOPE = 'NEWHOPE',
  EMPIRE = 'EMPIRE',
  JEDI = 'JEDI'
}
export enum Stars {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5
}

export interface Review {
  id: string; // needed for @ngrx/entity
  episode: Episode;
  stars: Stars;
  commentary: string;
}
