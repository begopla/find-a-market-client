import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Searchbar.css";
import { Box, Input, InputGroup, InputRightElement, Button, Center, useColorModeValue } from '@chakra-ui/react';
import service from "../../services/apiHandler"
import { SearchIcon } from '@chakra-ui/icons';

export default function Searchbar() {
    const [inputText, setInputText] = useState("");
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await service.get("/search", inputText)
            console.log(data)
            navigate("/search")
        } catch (error) {
            setError(e.message)
        }
    }

    return (
        <Center>
            <Box className='searchBar' h='18rem' mt='3rem' w='100%'>
                <Center pos='relative' top='45%'>
                    <InputGroup size='sm' w='70%'>
                        <Input
                            pr='4.5rem'
                            borderRadius='xl'
                            bg={useColorModeValue('white', 'gray.700')}
                            type="text"
                            placeholder="Search..."
                            onChange={(e) =>
                                setInputText(e.target.value)
                            } />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.5rem' size='sm' px='5'
                                _hover={{ bgColor: 'teal.200' }}
                                onClick={handleSubmit}>
                                <SearchIcon />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Center>
            </Box>
        </Center>
    )

}