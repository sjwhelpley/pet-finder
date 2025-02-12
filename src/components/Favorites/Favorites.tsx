import React from "react";

import { Grid2, Pagination, Typography } from "@mui/material";

import Match from "./Match";
import { useLazyFetchDogsByIdQuery } from "../../redux/api/dogsApi";
import { useLazyFetchLocationsByZipQuery } from "../../redux/api/locationsApi";
import { selectFavorites } from "../../redux/favoritesSlice";
import { useAppSelector } from "../../redux/hooks";
import Layout from "../Layout";
import DogCard from "../Search/DogCard";

export default function Favorites() {
  const favorites = useAppSelector(selectFavorites);
  const [fetchDogsById, { data: dogs = [] }] = useLazyFetchDogsByIdQuery();
  const [getLocations, { data: locations = [] }] =
    useLazyFetchLocationsByZipQuery();

  const [page, setPage] = React.useState(1);
  const [pageItems, setPageItems] = React.useState<string[]>([]);
  const total = favorites.length;
  const size = 100;

  React.useEffect(() => {
    // Make sure favorites over 100 items are handled with pagination
    if (total > 100) {
      const startIndex = (page - 1) * size;
      const endIndex = Math.min(startIndex + size, total);
      const pageItems = favorites.slice(startIndex, endIndex);
      setPageItems(pageItems);
      fetchDogsById(pageItems);
    } else {
      setPageItems(favorites);
      fetchDogsById(favorites);
    }
  }, [favorites, page]);

  React.useEffect(() => {
    getLocations(dogs.map((i) => i.zip_code));
  }, [dogs]);

  return (
    <Layout>
      <Typography sx={{ my: 1, fontSize: 20 }}>Favorites</Typography>
      {total === 0 ? (
        <Typography sx={{ mt: 2 }} align="center">
          No favorites yet. Search to get started!
        </Typography>
      ) : (
        <>
          <Typography sx={{ my: 1 }}>
            {total} favorite{total !== 1 && "s"}
          </Typography>

          <Grid2 container spacing={4} sx={{ my: 2 }}>
            <Match locations={locations} />

            {pageItems.map((id) => {
              const dog = dogs.find((dog) => dog.id === id);

              return (
                <DogCard
                  key={id}
                  dog={dog}
                  location={
                    dog
                      ? locations.find((loc) => loc.zip_code === dog.zip_code)
                      : undefined
                  }
                />
              );
            })}
          </Grid2>
          {total > 100 && (
            <Grid2 container justifyContent="center">
              <Pagination
                count={Math.ceil(total / size)}
                page={page}
                onChange={(_, value) => setPage(value)}
              />
            </Grid2>
          )}
        </>
      )}
    </Layout>
  );
}
