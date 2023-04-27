import { createAsyncThunk } from '@reduxjs/toolkit';
import { HitPizza, HitSearchResults } from './types';
import algoliasearch from 'algoliasearch';
import invarmen from '../../invarmen.json';

// import axios from 'axios';

// export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
//   'pizza/fetchPizzasStatus',
//   async (params) => {
//     const { queryString } = params;

//     const { data } = await axios.get<Pizza[]>(
//       `https://64074338862956433e6a09d1.mockapi.io/items?${queryString}`,
//     );
//     return data;
//   },
// );

const client = algoliasearch(invarmen.API_KEY, invarmen.SECRET_KEY);
const arrayPizzas = client.initIndex('pizzas');

export const fetchPizzas = createAsyncThunk<HitSearchResults, { query: string; page: number }>(
  'pizzaSearch/search',
  async ({ query, page }) => {
    const {
      hits,
      nbPages,
      page: currentPage,
    } = await arrayPizzas.search<HitPizza>(query, {
      hitsPerPage: 8,
      page,
    });
    return { hits, nbPages, page: currentPage };
  },
);
