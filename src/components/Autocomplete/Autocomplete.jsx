import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { Input, Spinner } from "@chakra-ui/react";
const Autocomplete = ({ props: { coordinates, setCoordinates, address, setAddress } }) => {
  

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    console.log(latLng);
    setCoordinates(latLng);
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
