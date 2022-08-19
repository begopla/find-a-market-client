import React, { useState, } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { API_URL } from '../../constants';
import {
    Button,
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
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import Autocomplete from "../Autocomplete/Autocomplete";
import Select from 'react-select';

export default function FormCreateMarket() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const firstField = React.useRef();
    const [marketCreated, setMarketCreated] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState([]);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [description, setDescription] = useState("");
    const [website, setWebsite] = useState("");
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const [openingDaysValues, setOpeningDaysValues] = useState([]);
    const [openingMonthsValues, setOpeningMonthsValues] = useState([]);

    const navigate = useNavigate();

    const objSentAsProps = {
        coordinates: coordinates,
        setCoordinates: setCoordinates,
        address: address,
        setAddress: setAddress
    };

    const typeOptions = [
        { value: 'Fresh Food market', label: 'Fresh Food market' },
        { value: 'Farmers market', label: 'Farmers market' },
        { value: 'Flea market', label: 'Flea market' },
        { value: 'Street Food market', label: 'Street Food market' },
        { value: 'Bazaar', label: 'Bazaar' },
        { value: 'Night market', label: 'Night market' },
        { value: 'Books market', label: 'Books market' },
        { value: 'Fish market', label: 'Fish market' }
    ];

    const daysOptions = [
        { value: 'Every day', label: 'Every day' },
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' }
    ];

    const monthsOptions = [
        { value: 'All year', label: 'All year' },
        { value: 'January', label: 'January' },
        { value: 'February', label: 'February' },
        { value: 'March', label: 'March' },
        { value: 'April', label: 'April' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'July', label: 'July' },
        { value: 'August', label: 'August' },
        { value: 'September', label: 'September' },
        { value: 'October', label: 'October' },
        { value: 'November', label: 'November' },
        { value: 'December', label: 'December' }
    ];

    const handleDays = openingDaysValues => { setOpeningDaysValues(openingDaysValues) }
    const handleMonths = openingMonthsValues => { setOpeningMonthsValues(openingMonthsValues) }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("authToken")
            const openingDaysValuesArray = [];
            openingDaysValues.forEach(entrie => {
                openingDaysValuesArray.push(entrie.value)
            });
            const openingMonthsValuesArray = [];
            openingMonthsValues.forEach(entrie => {
                openingMonthsValuesArray.push(entrie.value)
            });
            const newMarket = { name, type: type.value, openingDays: openingDaysValuesArray, openingMonths: openingMonthsValuesArray, from, to, description, website, coordinates, address }

            const res = await axios.post(`${API_URL}/markets`, newMarket, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.status === 200) {
                toggleMarketCreated()
            }
            navigate("/")

        } catch (error) {
            setError(e.message)
        }
    };
    const toggleMarketCreated = () => setMarketCreated(!marketCreated);
    const openCreateMarket = () => {
        if (marketCreated === true) {
            toggleMarketCreated()
            onOpen();
        } else onOpen();
    };

    return (
        <>
            <Button leftIcon={<EditIcon />} colorScheme='teal' onClick={openCreateMarket}>
                Add a market
            </Button>
            {!marketCreated && <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Add a new market
                    </DrawerHeader>
                    <DrawerBody >
                        <Stack spacing='24px'>
                            <FormControl isRequired>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input
                                    ref={firstField}
                                    id='name'
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor='type'>Type of market</FormLabel>
                                <Select
                                    name='type'
                                    options={typeOptions}
                                    value={type}
                                    onChange={setType}

                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor='opening_days'>Opening days</FormLabel>
                                <Select isMulti
                                    name='opening_days'
                                    options={daysOptions}
                                    value={openingDaysValues}
                                    isClearable
                                    closeMenuOnSelect={false}
                                    onChange={handleDays}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor='opening_months'>Opening months</FormLabel>
                                <Select isMulti
                                    name='opening_months'
                                    options={monthsOptions}
                                    value={openingMonthsValues}
                                    isClearable
                                    closeMenuOnSelect={false}
                                    onChange={handleMonths}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Opening hours</FormLabel>
                                <Stack direction={'row'} >
                                    <Stack>
                                        <FormLabel htmlFor="from">From</FormLabel>
                                        <Input
                                            type={'time'}
                                            name='from'
                                            onChange={(e) => setFrom(e.target.value)}
                                        />
                                    </Stack>
                                    <Stack>
                                        <FormLabel htmlFor="to">to</FormLabel>
                                        <Input
                                            type={'time'}
                                            name='to'
                                            onChange={(e) => setTo(e.target.value)}
                                        />
                                    </Stack>
                                </Stack>
                            </FormControl>


                            <FormControl>
                                <FormLabel htmlFor='description'>Description</FormLabel>
                                <Textarea
                                    id='description'
                                    name='description'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor='address'>Location</FormLabel>
                                <Autocomplete props={objSentAsProps}></Autocomplete>
                            </FormControl>

                            <FormControl>
                                <FormLabel htmlFor='website'>Website</FormLabel>
                                <Input
                                    type='url'
                                    id='website'
                                    name='website'
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                            </FormControl>

                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type='submit' colorScheme='blue' onClick={handleSubmit}>Submit</Button>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>}
        </>
    )
}