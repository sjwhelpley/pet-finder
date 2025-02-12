import { Dispatch, SetStateAction } from "react";

import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Grid2,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";

import SearchField from "./SearchField";
import { useFetchBreedsQuery } from "../../redux/api/dogsApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectAgeMax,
  selectAgeMin,
  selectBreeds,
  selectSort,
  selectSortField,
  selectZipCodes,
  setAgeMax,
  setAgeMin,
  setBreeds,
  setSort,
  setSortField,
  setZipCodes,
} from "../../redux/searchSlice";


export default function Filters({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const dispatch = useAppDispatch();
  const { data: breeds = [], isFetching, isLoading } = useFetchBreedsQuery();

  const selectedBreeds = useAppSelector(selectBreeds);
  const selectedAgeMin = useAppSelector(selectAgeMin);
  const selectedAgeMax = useAppSelector(selectAgeMax);
  const selectedZipCodes = useAppSelector(selectZipCodes);

  const selectedSort = useAppSelector(selectSort);
  const selectedSortField = useAppSelector(selectSortField);

  const handleClearFilters = () => {
    setPage(1);
    dispatch(setBreeds([]));
    dispatch(setZipCodes([]));
    dispatch(setAgeMin(null));
    dispatch(setAgeMax(null));
  };

  return (
    <Grid2
      container
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Grid2 size={12} container justifyContent="space-between">
        <Grid2 container alignItems="center">
          <Autocomplete
            options={["breed", "name", "age"]}
            value={selectedSortField}
            getOptionLabel={(option) =>
              option.charAt(0).toUpperCase() + option.slice(1)
            }
            onChange={(_, newValue) => dispatch(setSortField(newValue))}
            disableClearable
            sx={{ width: 150 }}
            size="small"
            renderInput={(params) => <TextField {...params} label="Sort By:" />}
          />
          <Tooltip
            title={
              selectedSort === "asc" ? "Ascending A to Z" : "Descending Z to A"
            }
          >
            <IconButton
              onClick={() =>
                dispatch(setSort(selectedSort == "asc" ? "desc" : "asc"))
              }
            >
              {selectedSort === "asc" ? <ArrowUpward /> : <ArrowDownward />}
            </IconButton>
          </Tooltip>
        </Grid2>

        <Button variant="contained" size="small" onClick={handleClearFilters}>
          Clear
        </Button>
      </Grid2>

      <Grid2 size={{ xs: 6, md: 2 }}>
        <SearchField
          label="Age (Min)"
          value={selectedAgeMin}
          onChange={(value) =>
            dispatch(setAgeMin(value ? parseInt(value) : null))
          }
        />
      </Grid2>
      <Grid2 size={{ xs: 6, md: 2 }}>
        <SearchField
          label="Age (Max)"
          value={selectedAgeMax}
          onChange={(value) =>
            dispatch(setAgeMax(value ? parseInt(value) : null))
          }
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <SearchField
          label="ZipCode"
          value={selectedZipCodes.join(",")}
          onChange={(value) =>
            dispatch(setZipCodes(value ? value.split(",") : []))
          }
          helperText="Add multiple by separating by commas."
          sx={{ mt: { xs: 0, md: 3 } }}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <Autocomplete
          options={breeds}
          value={selectedBreeds}
          limitTags={2}
          onChange={(_, newValue) => dispatch(setBreeds(newValue))}
          loading={isFetching || isLoading}
          multiple
          size="small"
          renderInput={(params) => <TextField {...params} label="Breeds" />}
        />
      </Grid2>
    </Grid2>
  );
}
