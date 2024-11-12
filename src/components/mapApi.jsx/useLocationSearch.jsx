import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";

const useLocationSearch = (handleLocationAddress) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showList, setShowList] = useState(false);
  const { selectedOutletData } = useSelector((state) => state?.outlet);
  const { deliveryRadiusKm, latitude, longitude } = selectedOutletData;
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const radlat1 = Math.PI * lat1 / 180;
    const radlat2 = Math.PI * lat2 / 180;
    const theta = lon1 - lon2;
    const radtheta = Math.PI * theta / 180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515; // Distance in miles
    return dist;
  };


  const isAddressInRange = async (address, lat = latitude, lon = longitude, range = deliveryRadiusKm) => {
    try {
      const geocodeResponse = await axios.get(`/api/maps/api/geocode/json`, {
        params: {
          address: address,
          key: import.meta.env.VITE_GOOGLE_PLACE,
        },
      });

      const location = geocodeResponse.data.results[0]?.geometry.location;
      if (location) {
        const { lat: suggestionLat, lng: suggestionLng } = location;

        const distance = calculateDistance(lat, lon, suggestionLat, suggestionLng);

        return distance <= range;
      }
      return false;
    } catch (error) {
      console.error("Error geocoding address:", error);
      return false;
    }
  };

  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query.trim()) return setSuggestions([]);
      try {
        const response = await axios.get(`/api/maps/api/place/autocomplete/json`, {
          params: {
            input: query,
            key: import.meta.env.VITE_GOOGLE_PLACE,
          },
        });

        setSuggestions(response.data.predictions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (query && showList) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
    return () => fetchSuggestions.cancel();
  }, [query, showList, fetchSuggestions]);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(`/api/maps/api/geocode/json`, {
            params: {
              latlng: `${latitude},${longitude}`,
              key: import.meta.env.VITE_GOOGLE_PLACE,
            },
          });
          if (response.data.results.length > 0) {

            setQuery(response.data.results?.[0].formatted_address);
            setShowList(true);
            setSuggestions([]);
          } else {
            console.error("No address found for the current location.");
          }
        } catch (error) {
          console.error("Error fetching current location:", error);
        }
      },
      (error) => console.error("Geolocation error:", error)
    );
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
        postalCode: "postal_code",
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
        name: result.name,
        geometry: result.geometry,
        vicinity: result.vicinity,
      });
    } catch (error) {
      console.error("Error fetching address details:", error);
    }
  };



  return {
    query,
    suggestions,
    showList,
    setQuery,
    setShowList,
    getCurrentLocation,
    handleSuggestionClick,
    isAddressInRange,
  };
};

export default useLocationSearch;
