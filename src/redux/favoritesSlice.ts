import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./store";

const initialState: string[] = [];

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      return state.filter((dogId) => dogId !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites;

export default favoritesSlice.reducer;
