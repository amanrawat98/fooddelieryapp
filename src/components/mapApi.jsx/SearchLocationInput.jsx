import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchLocationInput = () => {
  const [handleQueryValue, setHandleQueryValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // useEffect(() => {
  //   // Load the Google Places autocomplete service
  //   const autocompleteService = new window.google.maps.places.AutocompleteService();

  //   if (inputValue) {
  //     autocompleteService.getPlacePredictions({ input: inputValue }, (predictions, status) => {
  //       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
  //         setSuggestions(predictions.map((prediction) => prediction.description));
  //       } else {
  //         setSuggestions([]);
  //       }
  //     });
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [inputValue]);

  useEffect(() => {
    console.log(handleQueryValue);

    const handleAddressFetch = async (e) => {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${handleQueryValue}&key=${
          import.meta.env.VITE_GOOGLE_PLACE
        }`
      );

      console.log(response.data);
    };

    handleAddressFetch();
  }, [handleQueryValue]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter an address"
        value={handleQueryValue}
        onChange={(e) => setHandleQueryValue(e.target.value)}
      />
      {/* {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default SearchLocationInput;
