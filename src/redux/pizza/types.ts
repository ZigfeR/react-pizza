export type HitPizza = {
  objectID: string;
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: HitPizza[];
  status: Status;
}

export interface HitResults {
  hits: HitPizza[];
}
export interface HitSearchResults {
  hits: HitPizza[];
  nbPages: number;
  page: number;
}
