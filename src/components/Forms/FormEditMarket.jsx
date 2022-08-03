import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import service from "../../services/apiHandler"
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
//const API_URL = process.env.REACT_APP_API_URL

export default function FormEditMarket() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()
    const [detailMarket, setDetailMarket] = useState({})
    const [editMarket, setEditMarket] = useState({})
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const { marketId } = useParams()

    const handleDeleteMarket = async () => {
		const { data } = await service.delete(`/markets/${marketId}`)
        console.log(data);
		console.log("Market deleted: ", marketId);
		setTimeout(() => navigate("/markets"), 1000)
	}

    const handleEditMarket = async (e) => {
        e.preventDefault()
        try {
            const { data } = await service.put(`/markets/${marketId}`, editMarket)
            setDetailMarket(data)
            navigate(`/markets/${marketId}`)
            console.log(data)
            console.log("Market updated: ", editMarket);
        } catch (error) {
            setError(e.message)
        }
    }

    const getOneMarket = async () => {
        const { data } = await service.get(`/markets/${marketId}`)
        setEditMarket(data)
    }

    useEffect(() => {
        getOneMarket()
    }, [])

    return (
        <>
            <Button leftIcon={<EditIcon />} colorScheme='teal' onClick={onOpen}>
                Edit market
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Edit market
                    </DrawerHeader>
                    <form onSubmit={handleEditMarket}>
                        <DrawerBody>

                            <Stack spacing='24px'>
                                <FormControl isRequired>
                                    <FormLabel htmlFor='name'>Name</FormLabel>
                                    <Input
                                        ref={firstField}
                                        id='name'
                                        name="name"
                                        value={editMarket.name}
                                        onChange={(e) =>
                                            setEditMarket({
                                                ...editMarket,
                                                [e.target.name]: e.target.value,
                                            })
                                        }
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor='type'>Type of market</FormLabel>
                                    <Select
                                        id='type'
                                        name='type'
                                        //value={editMarket.type}
                                        onChange={(e) =>
                                            setEditMarket({
                                                ...editMarket,
                                                [e.target.type]: e.target.value,
                                            })
                                        }>
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
                                        //value={editMarket.description}
                                        onChange={(e) =>
                                            setEditMarket({
                                                ...editMarket,
                                                [e.target.description]: e.target.value,
                                            })
                                        } />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor='website'>Website</FormLabel>
                                    <Input
                                        type='url'
                                        id='website'
                                        name='website'
                                        //value={editMarket.website}
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

                        <DrawerFooter borderTopWidth='1px'>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type='submit' colorScheme='blue' mr={3} onClick={onClose}>
                                Submit
                            </Button>
                            <Button colorScheme='red' onClick={handleDeleteMarket}>
                                Delete
                            </Button>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </>
    )
}
