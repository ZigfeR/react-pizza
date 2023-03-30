import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { queryString } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://64074338862956433e6a09d1.mockapi.io/items?${queryString}`,
    );
    return data;
  },
);
