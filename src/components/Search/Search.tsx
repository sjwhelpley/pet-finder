import React from "react";

import { CircularProgress, Grid2, Pagination, Typography } from "@mui/material";

import DogCard from "./DogCard";
import Filters from "./Filters";
import {
  useLazyFetchDogsByIdQuery,
  useLazyFetchDogsQuery,
} from "../../redux/api/dogsApi";
import { useLazyFetchLocationsByZipQuery } from "../../redux/api/locationsApi";
import { useAppSelector } from "../../redux/hooks";
import {
  selectAgeMax,
  selectAgeMin,
  selectBreeds,
  selectSort,
  selectSortField,
  selectZipCodes,
} from "../../redux/searchSlice";
import Layout from "../Layout";

export default function Search() {
  const [
    searchDogs,
    {
      data: dogIds = { total: 0, resultIds: [], next: null },
      isLoading,
      isFetching,
    },
  ] = useLazyFetchDogsQuery();
  const [fetchDogsById, { data: dogs = [] }] = useLazyFetchDogsByIdQuery();
  const [getLocations, { data: locations = [] }] =
    useLazyFetchLocationsByZipQuery();

  const selectedBreeds = useAppSelector(selectBreeds);
  const selectedAgeMin = useAppSelector(selectAgeMin);
  const selectedAgeMax = useAppSelector(selectAgeMax);
  const selectedZipCodes = useAppSelector(selectZipCodes);

  const selectedSort = useAppSelector(selectSort);
  const selectedSortField = useAppSelector(selectSortField);

  const size = 18;
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const params = {
      size,
      from: (page - 1) * size,
      sort: `${selectedSortField?.toLowerCase() ?? "breed"}:${selectedSort}`,
      breeds: selectedBreeds,
      zipCodes: selectedZipCodes,
      ageMin: selectedAgeMin || null,
      ageMax: selectedAgeMax || null,
    };

    searchDogs(params)
      .unwrap()
      .then((res) => {
        fetchDogsById(res.resultIds);
      });
  }, [
    page,
    selectedBreeds,
    selectedSort,
    selectedSortField,
    selectedZipCodes,
    selectedAgeMin,
    selectedAgeMax,
  ]);

  React.useEffect(() => {
    getLocations(dogs.map((i) => i.zip_code));
  }, [dogs]);

  return (
    <Layout>
      <Typography sx={{ my: 2, fontSize: 20 }}>
        Search For Your Perfect Pet
      </Typography>

      <Filters setPage={setPage} />

      {isLoading || isFetching ? (
        <Grid2 container>
          <CircularProgress />
        </Grid2>
      ) : (
        <>
          {dogIds.total === 0 ? (
            <Typography sx={{ fontWeight: "bold", mt: 2 }} align="center">
              No results found.
            </Typography>
          ) : (
            <>
              <Grid2 size={12}>
                <Typography sx={{ my: 2 }}>
                  {dogIds.total} result{dogIds.total !== 1 && "s"}
                </Typography>
              </Grid2>

              <Grid2 container spacing={4} sx={{ my: 2 }}>
                {dogIds.resultIds.map((id) => {
                  const dog = dogs.find((dog) => dog.id === id);

                  return (
                    <DogCard
                      key={id}
                      dog={dog}
                      location={
                        dog
                          ? locations.find(
                              (loc) => loc.zip_code === dog.zip_code
                            )
                          : undefined
                      }
                    />
                  );
                })}
              </Grid2>

              <Grid2 container justifyContent="center">
                <Pagination
                  count={Math.ceil(dogIds.total / size)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                />
              </Grid2>
            </>
          )}
        </>
      )}
    </Layout>
  );
}
