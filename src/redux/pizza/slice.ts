import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';
import { HitPizza, PizzaSliceState, Status } from './types';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<HitPizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload.hits;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
