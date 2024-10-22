import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, Paper, TextField } from "@mui/material";
import debounce from "lodash/debounce";

const SearchLocationInput = () => {
  const [handleQueryValue, setHandleQueryValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Create a debounced function using useCallback
  const debouncedFetchSuggestions = useCallback(
    debounce(async (query) => {
      if (query) {
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${import.meta.env.VITE_GOOGLE_PLACE}`
          );

          if (response.data && response.data.predictions) {
            setSuggestions(response.data.predictions.map((prediction) => prediction.description));
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    }, 300), // Debounce for 300ms
    []
  );

  useEffect(() => {
    debouncedFetchSuggestions(handleQueryValue);
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, [handleQueryValue, debouncedFetchSuggestions]);

  return (
    <div>
      <TextField
        variant="outlined"
        placeholder="Enter an address"
        value={handleQueryValue}
        onChange={(e) => setHandleQueryValue(e.target.value)}
        sx={{
          width: '100%',
          mb: 2,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderRadius: '4px',
            },
            padding: '4px 10px',
            height: '30px',
            '& input': {
              padding: '0px',
              lineHeight: '1.5',
            },
          },
        }}
      />
      {suggestions.length > 0 && (
        <Paper elevation={3} sx={{ maxHeight: 200, overflow: 'auto' }}>
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem button key={index}>
                <ListItemText primary={suggestion} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchLocationInput;
