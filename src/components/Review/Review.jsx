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
import Moment from 'moment';

export default function Review({ author, date, review }) {
    const formatDate = Moment(date).format('ll')
    return (
        <Box bg={useColorModeValue('#F6F6F6', 'gray.900')}
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
                    src={author?.profilePicture}
                />
                <Stack>
                    <Text fontSize='md'>{author?.name}</Text>
                    <Text fontSize='xs'>Posted on {formatDate}</Text>
                </Stack>
            </Flex>
        </Box>
    )
}