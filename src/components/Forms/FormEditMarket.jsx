import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import service from "../../services/apiHandler";
import {
  Button,
  Spinner,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  Stack,
  FormLabel,
  Input,
  Select,
  Textarea,
  useDisclosure,
  FormControl,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function FormEditMarket({
  props: { detailMarket, setDetailMarket },
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [editMarket, setEditMarket] = useState({ ...detailMarket });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { marketId } = useParams();
  const [toggleEditMarket, setToggleEditMarket] = useState(false);
  const [address, setAddress] = useState("");

  const handleDeleteMarket = async () => {
    const { data } = await service.delete(`/markets/${marketId}`);
    console.log(data);
    console.log("Market deleted: ", marketId);
    setTimeout(() => navigate("/markets"), 1000);
  };

  const handleEditMarket = async (e) => {
    e.preventDefault();
    try {
      //getting the new activity data
      const { data } = await service.put(`/markets/${marketId}`, editMarket);
      setDetailMarket(data);
      // navigate(`/markets/${marketId}`)
      console.log(data);
      console.log("Market updated: ", detailMarket);

      if (data) {
        toggleMarket();
      }
    } catch (error) {
      setError(e.message);
    }
  };

  const toggleMarket = () => setToggleEditMarket(!toggleEditMarket);
  const openEditMarket = () => {
    if (toggleEditMarket === true) {
      toggleMarket();
      onOpen();
    } else onOpen();
  };

  const handleSelectAutocomplete = async (value) => {
    const results = await geocodeByAddress(value);
    console.log(results);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    console.log(latLng);
    //!setCoordinates(latLng);
    //console.log("Coordinates:", coordinates)
  };
  return (
    <>
      <Button
        leftIcon={<EditIcon />}
        colorScheme="teal"
        onClick={openEditMarket}
      >
        Edit market
      </Button>
      {!toggleEditMarket && (
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">Edit market</DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <FormControl isRequired>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="name"
                    name="name"
                    placeholder={detailMarket.name}
                    onChange={(e) =>
                      setEditMarket({
                        ...editMarket,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="type">Type of market</FormLabel>
                  <Select
                    id="type"
                    name="type"
                    placeholder={detailMarket.type}
                    onChange={(e) =>
                      setEditMarket({
                        ...editMarket,
                        [e.target.type]: e.target.value,
                      })
                    }
                  >
                    <option value="Fresh Food market">Fresh Food market</option>
                    <option value="Farmers market">Farmers market</option>
                    <option value="Flea market">Flea market</option>
                    <option value="Street Food market">
                      Street Food market
                    </option>
                    <option value="Bazaar">Bazaar</option>
                    <option value="Night market">Night market</option>
                    <option value="Books market">Books market</option>
                    <option value="Fish market">Fish market</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder={detailMarket.description}
                    onChange={(e) =>
                      setEditMarket({
                        ...editMarket,
                        [e.target.description]: e.target.value,
                      })
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="address">Location</FormLabel>
                  <p>Current location: {detailMarket.address}</p>
                  <PlacesAutocomplete
                    value={editMarket.address}
                    onChange={(e) => setAddress({
                        ...editMarket,
                        [e.target.description]: e.target.value,
                    })}
                    onSelect={handleSelectAutocomplete}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        
                        <Input
                          {...getInputProps({ placeholder: `${detailMarket.address}`})}
                        />
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
                              backgroundColor: suggestion.active
                                ? "#08ffc8"
                                : "#fff",
                            };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  style,
                                })}
                              >
                                {suggestion.description}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="website">Website</FormLabel>
                  <Input
                    type="url"
                    id="website"
                    name="website"
                    placeholder={detailMarket.website}
                    onChange={(e) =>
                      setEditMarket({
                        ...editMarket,
                        [e.target.website]: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                onClick={handleEditMarket}
              >
                Submit
              </Button>
              <Button colorScheme="red" onClick={handleDeleteMarket}>
                Delete
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
