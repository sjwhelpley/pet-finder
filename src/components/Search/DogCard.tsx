import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";

import { Location } from "../../redux/types";
import {
  addFavorite,
  removeFavorite,
  selectFavorites,
} from "../../redux/favoritesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Dog } from "../../redux/types";

export default function DogCard({
  dog,
  location,
  match,
}: {
  dog: Dog | undefined;
  location: Location | undefined;
  match?: boolean;
}) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const isFavorited = dog ? favorites.includes(dog.id) : false;

  return (
    <Grid2
      size={{ xs: match ? 10 : 6, md: match ? 10 : 4 }}
      container
      justifyContent="center"
      alignItems="center"
    >
      {dog ? (
        <Card sx={{ width: "100%", position: "relative" }}>
          <CardMedia
            sx={{ height: match ? 200 : 300 }}
            image={dog.img}
            title={`Dog named ${dog.name}`}
          />
          <CardContent sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>
              {dog.name}
            </Typography>
            <Typography>
              Age {dog.age} - {dog.breed}
            </Typography>
            <Typography sx={{ fontSize: 12 }}>
              Located in{" "}
              {location
                ? `${location.city}, ${location.state} ${location.zip_code}`
                : dog.zip_code}
            </Typography>
          </CardContent>
          <IconButton
            onClick={() =>
              isFavorited
                ? dispatch(removeFavorite(dog.id))
                : dispatch(addFavorite(dog.id))
            }
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "#FFFFFF50",
            }}
          >
            {isFavorited ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Card>
      ) : (
        <CircularProgress />
      )}
    </Grid2>
  );
}
