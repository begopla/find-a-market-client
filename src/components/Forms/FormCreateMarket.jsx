import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
//import service from "../../services/apiHandler"
import axios from 'axios';
import {API_URL} from '../../constants';
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
    Select,
    Textarea,
    useDisclosure,
    FormControl
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons';

export default function FormCreateMarket() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [marketCreated, setMarketCreated] = useState(false);
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")
    const [website, setWebsite] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
        const token = localStorage.getItem("authToken")
        const newMarket = {name, type, description, website}
        console.log(name,type, description, website  )
        //const res = await service.post("/markets", newMarket)
        const res = await axios.post(`${API_URL}/markets`, newMarket,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
            
        })
        if(res.status === 200){
            toggleMarketCreated()
        }
    
        //!how to refresh the page after market submitted?
        navigate("/markets")    
        } catch (error) {
            setError(e.message)
        }
    }
    const toggleMarketCreated = () => setMarketCreated(!marketCreated);
    const openCreateMarket =() =>{
        if(marketCreated === true){
            toggleMarketCreated()
            onOpen();
        }else onOpen();
         }


    return (
        <>
            <Button leftIcon={<EditIcon />} colorScheme='teal' onClick={openCreateMarket}>
                Add a market
            </Button>
         { !marketCreated &&  <Drawer
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
                    
                        <DrawerBody>

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
                                        placeholder='Select one'
                                        id='type'
                                        name='type'
                                        onChange={(e) => {setType(e.target.value)
                                        console.log(e.target.value)}}>
                                        <option value='Fresh Food market'>Fresh Food market</option>
                                        <option value='Farmers market'>Farmers market</option>
                                        <option value='Flea market'>Flea market</option>
                                        <option value='Street Food market'>Street Food market</option>
                                        <option value='Bazaar'>Bazaar</option>
                                        <option value='Night market'>Night market</option>
                                        <option value='Books market'>Books market</option>
                                        <option value='Fish market'>Fish market</option>
                                    </Select>
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
            </Drawer> }
        </>
    )
}
