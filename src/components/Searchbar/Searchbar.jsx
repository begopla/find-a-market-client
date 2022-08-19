import { useState } from "react"
import "./Searchbar.css";
import {
    Box,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Center,
    useColorModeValue,
    Text,
    Hide
} from '@chakra-ui/react';
import service from "../../services/apiHandler"
import { SearchIcon } from '@chakra-ui/icons';

export default function Searchbar({ props: { markets, setMarkets } }) {
    const [inputText, setInputText] = useState("");
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        try {
            const { data } = await service.get(`/markets/search?q=${inputText}`)
            setMarkets(data)
        } catch (error) {
            setError(e.message)
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit();
        }
    }

    return (
        <Center>
            <Box className='searchBar' h='18rem' mt='3rem' w='100%' zIndex={0}>
                <Center as="flex" flexDirection='column' pos='relative' top={{ base: '35%', md: '45%', lg: '45%' }}>
                    <Hide above='700px'><Text className="nameSearch">Localish</Text></Hide>
                    <InputGroup size='sm' w='70%'>
                        <Input
                            pr='4.5rem'
                            borderRadius='xl'
                            bg={useColorModeValue('white', 'gray.700')}
                            type="search"
                            placeholder="Search..."
                            name="q"
                            onChange={(e) =>
                                setInputText(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.5rem' size='sm' px='5'
                                _hover={{ bgColor: 'teal.200' }}
                                onClick={handleSubmit}
                            >
                                <SearchIcon />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Center>
            </Box>
        </Center>
    )

}