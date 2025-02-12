import { createApi } from "@reduxjs/toolkit/query/react";

import axiosBaseQuery from "./axiosBaseQuery";
import { Location } from "../types";

type Coordinates = {
  lat: number;
  lon: number;
};

type SearchLocationsArgs = {
  city?: string;
  states?: string[];
  geoBoundingBox?: {
    top?: Coordinates;
    left?: Coordinates;
    bottom?: Coordinates;
    right?: Coordinates;
    bottom_left?: Coordinates;
    top_left?: Coordinates;
  };
  size?: number;
  from?: number;
};

type SearchLocationsResponse = {
  results: Location[];
  total: number;
};

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://frontend-take-home-service.fetch.com/locations/",
  }),
  endpoints: (builder) => ({
    fetchLocationsByZip: builder.query<Location[], string[]>({
      query: (args) => ({
        url: "",
        method: "POST",
        data: args,
      }),
    }),
    searchLocationsByZip: builder.query<
      SearchLocationsResponse,
      SearchLocationsArgs
    >({
      query: (args) => ({
        url: "search",
        method: "POST",
        data: args,
      }),
    }),
  }),
});

export const {
  useLazyFetchLocationsByZipQuery,
  useLazySearchLocationsByZipQuery,
} = locationsApi;
