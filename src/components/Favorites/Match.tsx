import { Button, CircularProgress, Grid2, Typography } from "@mui/material";

import {
  useLazyFetchDogsByIdQuery,
  useLazyFetchMatchQuery,
} from "../../redux/api/dogsApi";
import { selectFavorites } from "../../redux/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMatch, setMatch } from "../../redux/matchSlice";
import { Location } from "../../redux/types";
import DogCard from "../Search/DogCard";

export default function Match({ locations }: { locations: Location[] }) {
  const dispatch = useAppDispatch();
  const [findMatch, { isLoading, isFetching }] = useLazyFetchMatchQuery();
  const [
    findMatchById,
    { isLoading: isLoadingDetails, isFetching: isFetchingDetails },
  ] = useLazyFetchDogsByIdQuery();

  const favorites = useAppSelector(selectFavorites);
  const match = useAppSelector(selectMatch);

  const handleFindMatch = () => {
    findMatch(favorites)
      .unwrap()
      .then((res) => {
        if (res.match) {
          findMatchById([res.match])
            .unwrap()
            .then((res) => {
              if (res.length === 1) {
                dispatch(setMatch(res[0]));
              }
            });
        }
      })
      .catch((err) => console.log(err));
  };

  if (favorites.length > 0)
    return (
      <Grid2
        size={{ xs: 6, md: 4 }}
        container
        justifyContent="center"
        alignItems="center"
        sx={{ p: 1, backgroundColor: "lightblue", borderRadius: "4px" }}
      >
        {isLoading || isFetching || isLoadingDetails || isFetchingDetails ? (
          <CircularProgress />
        ) : (
          <>
            {match ? (
              <>
                <Typography sx={{ width: "100%", mb: 1 }} align="center">
                  Your perfect pet has been fetched!
                </Typography>

                <DogCard
                  dog={match}
                  match
                  location={
                    match
                      ? locations.find((loc) => loc.zip_code === match.zip_code)
                      : undefined
                  }
                />

                <Grid2 size={12} container justifyContent="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleFindMatch}
                    sx={{ mt: 1 }}
                  >
                    Search Again
                  </Button>
                </Grid2>
              </>
            ) : (
              <>
                <Typography>Ready to find your perfect match?</Typography>
                <Button onClick={handleFindMatch}>Find Match</Button>
              </>
            )}
          </>
        )}
      </Grid2>
    );

  return null;
}
