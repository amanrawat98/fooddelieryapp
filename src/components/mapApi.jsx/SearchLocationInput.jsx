import React  from "react";
import { List, ListItem, ListItemText, Paper, TextField, Typography, Box, Tooltip } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import useLocationSearch from "./useLocationSearch";

const SearchLocationInput = ({handleLocationAddress}) => {
  const {
    query,
    suggestions,
    showList,
    setQuery,
    setShowList,
    getCurrentLocation,
    handleSuggestionClick,
  } = useLocationSearch(handleLocationAddress);


  
  return (
    <div style={{ position: "relative" }}>
      <TextField
        placeholder="Search an address"
        variant="standard"
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowList(true);
        }}
        sx={{
          width: "100%",
          mb: 2,
        }}
        InputProps={{
          endAdornment: (
            <Tooltip title="Current Location" placement="top" arrow>
            <Box
              onClick={getCurrentLocation}
              sx={{
                padding: 0,
                color: "primary.main",
                cursor: "pointer",
              }}
            >
              <LocationOn />
            </Box>
            </Tooltip>
          ),
        }}
      />
      {showList ? (
        <>
          {suggestions?.length ? (
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                maxHeight: 200,
                overflow: "auto",
                zIndex: 9999,
              }}
            >
              <List>
                {suggestions?.map((suggestion, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    sx={{ cursor: "pointer" }}
                  >
                    <ListItemText primary={suggestion.description} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ) : query && !suggestions.length ? (
            <Typography variant="body2" sx={{ padding: 2, textAlign: "center",color:"primary.main" }}>
              No address available
            </Typography>
          ) : null}
        </>
      ) : null}
</div>
  );
};

export default SearchLocationInput;
