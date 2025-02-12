import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./store";
import { Dog } from "./types";

// ... existing code ...
interface MatchState {
  match: Dog | null;
}

const initialState: MatchState = {
  match: null,
};

export const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setMatch(state, action: PayloadAction<Dog | null>) {
      state.match = action.payload;
    },
  },
});

export const { setMatch } = matchSlice.actions;

export const selectMatch = (state: RootState) => state.match.match;

export default matchSlice.reducer;
