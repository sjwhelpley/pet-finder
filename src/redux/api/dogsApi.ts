import { createApi } from "@reduxjs/toolkit/query/react";

import type { Dog } from "../types";
import axiosBaseQuery from "./axiosBaseQuery";

type FetchDogsArgs = {
  from: number;
  size: number;
  sort: string;
  breeds: string[];
  zipCodes: string[];
  ageMin?: number | null;
  ageMax?: number | null;
};

type FetchDogsResponse = {
  total: number;
  resultIds: string[];
  next: string | null;
};

export const dogsApi = createApi({
  reducerPath: "dogsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: "https://frontend-take-home-service.fetch.com/dogs/",
  }),
  endpoints: (builder) => ({
    fetchBreeds: builder.query<string[], void>({
      query: () => ({
        url: "breeds",
        method: "GET",
      }),
    }),
    fetchDogs: builder.query<FetchDogsResponse, FetchDogsArgs>({
      query: (args) => ({
        url: "search",
        method: "GET",
        params: args,
      }),
    }),
    fetchDogsById: builder.query<Dog[], string[]>({
      query: (args) => ({
        url: "",
        method: "POST",
        data: args,
      }),
    }),
    fetchMatch: builder.query<{ match: string }, string[]>({
      query: (args) => ({
        url: "match",
        method: "POST",
        data: args,
      }),
    }),
  }),
});

export const {
  useFetchBreedsQuery,
  useLazyFetchDogsQuery,
  useLazyFetchDogsByIdQuery,
  useLazyFetchMatchQuery,
} = dogsApi;
