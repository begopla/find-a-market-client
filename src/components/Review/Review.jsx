import React from "react";
import {
    Box,
    useColorModeValue,
    Text,
    Flex,
    Avatar,
    Stack
} from '@chakra-ui/react';
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

export default function Review({author, date, review}) {
    return (
        <Box bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            
            boxShadow='md'
            p='6'
            rounded='md'>
            <RiDoubleQuotesL />
            <Text as='i' pl='3rem'>{review}</Text>
            <Flex justify='flex-end'><RiDoubleQuotesR /></Flex>
            <Flex justify='flex-start' gap='1rem'>
                <Avatar
                    size={'md'}
                    src={author.profilePicture}
                />
                <Stack>
                    <Text fontSize='md'>{author.name}</Text>
                    <Text fontSize='xs'>Posted on date/date/date</Text>
                </Stack>
            </Flex>
        </Box>
    )
}