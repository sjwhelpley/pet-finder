import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authMiddleware } from "./api/authMiddleware";
import { dogsApi } from "./api/dogsApi";
import { locationsApi } from "./api/locationsApi";
import authSlice from "./authSlice";
import favoritesSlice from "./favoritesSlice";
import matchSlice from "./matchSlice";
import searchSlice from "./searchSlice";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authSlice,
    favorites: favoritesSlice,
    search: searchSlice,
    match: matchSlice,
    [dogsApi.reducerPath]: dogsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(dogsApi.middleware, locationsApi.middleware, authMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
