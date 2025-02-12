import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./store";

interface SearchState {
  breeds: string[];
  ageMin?: number | null;
  ageMax?: number | null;
  zipCodes: string[];
  sort: string;
  sortField: string;
}

const initialState: SearchState = {
  breeds: [],
  zipCodes: [],
  sort: "asc",
  sortField: "breed",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setBreeds: (state, action: PayloadAction<string[]>) => {
      state.breeds = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setSortField: (state, action: PayloadAction<string>) => {
      state.sortField = action.payload;
    },
    setAgeMin: (state, action: PayloadAction<number | null>) => {
      state.ageMin = action.payload;
    },
    setAgeMax: (state, action: PayloadAction<number | null>) => {
      state.ageMax = action.payload;
    },
    setZipCodes: (state, action: PayloadAction<string[]>) => {
      state.zipCodes = action.payload;
    },
  },
});

export const {
  setBreeds,
  setSort,
  setSortField,
  setAgeMin,
  setAgeMax,
  setZipCodes,
} = searchSlice.actions;

export const selectBreeds = (state: RootState) => state.search.breeds;
export const selectSort = (state: RootState) => state.search.sort;
export const selectSortField = (state: RootState) => state.search.sortField;
export const selectAgeMin = (state: RootState) => state.search.ageMin;
export const selectAgeMax = (state: RootState) => state.search.ageMax;
export const selectZipCodes = (state: RootState) => state.search.zipCodes;

export default searchSlice.reducer;
