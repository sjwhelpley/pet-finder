import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

import { setAuthenticated } from "../authSlice";

export const authMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      if ((action.payload as { status?: number })?.status === 401) {
        dispatch(setAuthenticated(false));
      }
    }

    return next(action);
  };
