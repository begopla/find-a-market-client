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
import Select from "react-select";


export default function FormEditMarket({
  props: { detailMarket, setDetailMarket, marketId, imageUrl, setImageUrl },
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [editMarket, setEditMarket] = useState({ ...detailMarket });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //const { marketId } = useParams();
  const [toggleEditMarket, setToggleEditMarket] = useState(false);
  const [addressEdited, setAddressEdited] = useState("");
  const [type, setType] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [openingDaysValues, setOpeningDaysValues] = useState([]);
  const [openingMonthsValues, setOpeningMonthsValues] = useState([]);

  const typeOptions = [
    { value: "Fresh Food market", label: "Fresh Food market" },
    { value: "Farmers market", label: "Farmers market" },
    { value: "Flea market", label: "Flea market" },
    { value: "Street Food market", label: "Street Food market" },
    { value: "Bazaar", label: "Bazaar" },
    { value: "Night market", label: "Night market" },
    { value: "Books market", label: "Books market" },
    { value: "Fish market", label: "Fish market" },
  ];

  const daysOptions = [
    { value: "Every day", label: "Every day" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const monthsOptions = [
    { value: "All year", label: "All year" },
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const handleDays = (openingDaysValues) => {
    const openingDaysValuesArray = [];
    console.log(openingDaysValues)
    openingDaysValues.forEach(entrie => {
      openingDaysValuesArray.push(entrie.value)
    });

    setEditMarket({
      ...detailMarket,
      openingDays: openingDaysValuesArray
    });
  };
  const handleMonths = (openingMonthsValues) => {
    setOpeningMonthsValues(openingMonthsValues);
    const openingMonthsValuesArray = [];
    openingMonthsValues.forEach(entrie => {
      openingMonthsValuesArray.push(entrie.value)
    });
    console.log('Opening Months', openingMonthsValues);
    setEditMarket({
      ...detailMarket,
      openingMonths: openingMonthsValuesArray
    });

  };
  const handleDeleteMarket = async () => {
    await service.delete(`/markets/${marketId}`);
    setTimeout(() => navigate("/"), 500);
  };

  const handleEditMarket = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    try {
      console.log(editMarket)
      fd.append("imageUrl", imageUrl);

      for (let [key, value] of Object.entries(editMarket)) {
        if (typeof value === "object") {
          value = JSON.stringify(value);
        }
        fd.append(key, value);
      }

      const { data } = await service.put(`/markets/${marketId}`, fd);
      setDetailMarket(data);
      if (data) {
        toggleMarket();
      }
    } catch (error) {
      setError(error.response.data.message);
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
          my="2rem"
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
              {error && <h3 className="error"> {error}</h3>}
                <FormControl isRequired>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="name"
                    name="name"
                    placeholder={detailMarket.name}
                    onChange={(e) => {

                      setEditMarket({
                        ...editMarket,
                        name: e.target.value,

                      })
                      console.log(e.target.value)
                    }
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="type">Type of market</FormLabel>
                  <Select
                    name="type"
                    placeholder={detailMarket.type}
                    options={typeOptions}
                    value={type}
                    onChange={setType}
                  />
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
                  <FormLabel htmlFor="opening_days">Opening days</FormLabel>
                  <Select
                    isMulti
                    name="openingDays"
                    options={daysOptions}
                    value={openingDaysValues}
                    isClearable
                    closeMenuOnSelect={false}
                    onChange={handleDays}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="opening_months">Opening months</FormLabel>
                  <Select
                    isMulti
                    name="openingMonths"
                    options={monthsOptions}
                    value={openingMonthsValues}
                    isClearable
                    closeMenuOnSelect={false}
                    onChange={handleMonths}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Opening hours</FormLabel>
                  <Stack direction={"row"}>
                    <Stack>
                      <FormLabel htmlFor="from">From</FormLabel>
                      <Input
                        type={"time"}
                        name="from"
                        onChange={(e) =>
                          setEditMarket({
                            ...editMarket,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Stack>
                    <Stack>
                      <FormLabel htmlFor="to">to</FormLabel>
                      <Input
                        type={"time"}
                        name="to"
                        onChange={(e) =>
                          setEditMarket({
                            ...editMarket,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </Stack>
                  </Stack>
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
                        website: e.target.value,
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
              <DeleteMarketAlert handleDeleteMarket={handleDeleteMarket} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
