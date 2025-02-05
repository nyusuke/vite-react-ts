import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export type TextSearchProps = {
  searchText: string;
  onChangeSearchText: (event: React.SyntheticEvent<{ value: string }>) => void;
  onSearch: () => void;
};

// presentational componentはmemoする
export const TextSearch = React.memo(
  ({
    searchText,
    onChangeSearchText,
    onSearch,
  }: TextSearchProps): React.ReactElement => {
    return (
      <>
        <Stack direction="row" spacing={3}>
          <TextField
            id="outlined-size-small"
            size="small"
            fullWidth
            label="search text"
            value={searchText}
            onChange={onChangeSearchText}
          />
          <Button variant="outlined" onClick={onSearch}>
            Search
          </Button>
        </Stack>
      </>
    );
  }
);
