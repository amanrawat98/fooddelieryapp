import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, Paper, TextField, Typography, Box, Tooltip } from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import debounce from "lodash/debounce";

const SearchLocationInput = ({handleLocationAddress}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(`/api/maps/api/place/autocomplete/json`, {
        params: {
          input: query,
          key: import.meta.env.VITE_GOOGLE_PLACE,
        },
      });
     
      setSuggestions(response.data.predictions ? response.data.predictions.map(prediction => ({
        description: prediction.description,
        place_id: prediction.place_id,
      })) : []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, 300),
    []
  );

  useEffect(() => {
    if (query && showList) {
      debouncedFetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
    return () => debouncedFetchSuggestions.cancel();
  }, [query, showList, debouncedFetchSuggestions]);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await axios.get(`/api/maps/api/geocode/json`, {
          params: {
            latlng: `${latitude},${longitude}`,
            key: import.meta.env.VITE_GOOGLE_PLACE,
          },
        });
        if (response.data.results.length > 0) {
          setQuery(response.data.results[0].formatted_address);
          setSuggestions([]);
        } else {
          console.error("No address found for the current location.");
        }
      } catch (error) {
        console.error("Error fetching current location:", error);
      }
    });
  };

  const handleSuggestionClick = async (suggestion) => {
    setQuery(suggestion.description);
    setSuggestions([]);
    setShowList(false);

    try {
      
      const response = await axios.get(`/api/maps/api/place/details/json`, {
        params: {
          place_id: suggestion.place_id, 
          key: import.meta.env.VITE_GOOGLE_PLACE,
        },
      });
      const result = response.data.result;

     
      const addressTypes = {
        country: "country",
        state: "administrative_area_level_1",
        city: "locality",
        street: "route",
        landmark: "sublocality_level_1",
        postalCode:"postal_code"
      };

      const addressComponents = result.address_components.reduce((acc, component) => {
        component.types.forEach((type) => {
          if (Object.values(addressTypes).includes(type)) {
            const key = Object.keys(addressTypes).find((key) => addressTypes[key] === type);
            if (key) {
              acc[key] = component.long_name;
            }
          }
        });
        return acc;
      }, {});
         
      
      handleLocationAddress({
        ...addressComponents,
        fullAddress: result.formatted_address, 
        name:result.name,
        geometry:result.geometry,
        vicinity:result.vicinity
      });
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };

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
