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

export default function Review() {
    return (
        <Box bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            maxW='50%'
            boxShadow='md'
            p='6'
            rounded='md'>
            <RiDoubleQuotesL />
            <Text as='i' pl='3rem'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, nostrum nihil quo nulla veritatis asperiores quisquam, corporis suscipit nemo temporibus, dolores illo velit incidunt praesentium nam quidem quis eius inventore.</Text>
            <Flex justify='flex-end'><RiDoubleQuotesR /></Flex>
            <Flex justify='flex-start' gap='1rem'>
                <Avatar
                    size={'md'}
                />
                <Stack>
                    <Text fontSize='md'>user_name</Text>
                    <Text fontSize='xs'>Posted on date/date/date</Text>
                </Stack>
            </Flex>
        </Box>
    )
}