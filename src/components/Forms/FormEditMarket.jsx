import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../services/apiHandler";
import {
  Center,
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
import DeleteMarketAlert from "../DeleteMarketAlert/DeleteMarketAlert";

export default function FormEditMarket({
  props: { detailMarket, setDetailMarket, marketId, imageUrl,setImageUrl },
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [editMarket, setEditMarket] = useState({ ...detailMarket });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //const { marketId } = useParams();
  const [toggleEditMarket, setToggleEditMarket] = useState(false);
  const [addressEdited, setAddressEdited] = useState("");

  const handleDeleteMarket = async () => {
    const { data } = await service.delete(`/markets/${marketId}`);
    setTimeout(() => navigate("/"), 500);
  };

  const handleEditMarket = async (e) => {
    e.preventDefault();
    const fd = new FormData()
    try {
        fd.append("imageUrl", imageUrl)
        
        for(let [key, value] of Object.entries(editMarket)){
          if(typeof value === 'object'){
            value = JSON.stringify(value)
          }
          fd.append(key, value)
        
        }
        const { data } = await service.put(`/markets/${marketId}`,fd);
        setDetailMarket(data);
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
    const latLng = await getLatLng(results[0]);
    setAddressEdited(results[0].formatted_address);
    setEditMarket({
      ...detailMarket,
      address: results[0].formatted_address,
      coordinates: latLng,
    });
  };

  return (
    <>
      <Center>
        <Button
          leftIcon={<EditIcon />}
          colorScheme="teal"
          minW="80%"
          onClick={openEditMarket}
        >
          Edit market
        </Button>
      </Center>
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
                {/* //For photo upload */}
                <FormControl>
                  <FormLabel htmlFor="imageUrl">Market photo</FormLabel>
                  <Input
                    name="imageUrl"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => setImageUrl(e.target.files[0])}
                  />
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
                  <PlacesAutocomplete
                    value={addressEdited}
                    onChange={setAddressEdited}
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
                          {...getInputProps({
                            placeholder: `${detailMarket.address}`,
                          })}
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
              <DeleteMarketAlert handleDeleteMarket={handleDeleteMarket}/>
              {/*<Button colorScheme="red" onClick={handleDeleteMarket}>
                Delete
              </Button>*/}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}