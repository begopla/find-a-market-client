import { BsThreeDots } from "react-icons/bs";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    IconButton,
    Text,
    Image,
    Box,
    Flex,
    useColorModeValue
} from '@chakra-ui/react'

export default function FooterPopover() {
    return (
        <Popover placement='top-start'>
            <PopoverTrigger>
                <IconButton><BsThreeDots size={25} /></IconButton>
            </PopoverTrigger>
            <PopoverContent bg={useColorModeValue('gray.200', 'gray.900')}>
                <PopoverArrow bg={useColorModeValue('gray.200', 'gray.900')}/>
                <PopoverCloseButton />
                <PopoverBody>
                    <Flex flexDirection='column' alignItems='center' gap='5px'>
                        <Text textAlign='center' fontWeight='bold'>More content in<br />the future!</Text>
                        <Box boxSize='6rem'><Image src="./future2.png" /></Box>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
} 