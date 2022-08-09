import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Input, Spinner } from "@chakra-ui/react";
const Autocomplete = ({ props: { coordinates, setCoordinates, address, setAddress } }) => {
  

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    console.log(results);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    console.log(latLng);
    setCoordinates(latLng);
    //console.log("Coordinates:", coordinates)
  };
  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Coordinates -lat:{coordinates.lat}</p>
            <Input {...getInputProps({ placeholder: "Type address" })} />
            <div>
              {loading && (
                <Spinner
                  position="fixed"
                  top={{ base: "30%", md: "40%", lg: "50%" }}
                  left="50%"
                  marginLeft="-1.5em"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="teal.500"
                  size="xl"
                />
              )}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#08ffc8" : "#fff",
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
};

export default Autocomplete;
