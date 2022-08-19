import React from "react"
import { Link } from "react-router-dom"
import { Center, Box, Image, Badge } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function OneMarket({ name, _id, type, imageUrl, address }) {

    return (
        <Center>
            <Link to={`/markets/${_id}`}>
                <Box maxW='20vw' overflow='hidden' pt='4' mb='2'>
                    <Image
                        boxSize='20vw'
                        objectFit='cover'
                        src={imageUrl}
                        alt={name}
                        borderRadius='xl'
                        boxShadow='lg' />
                    <Box p='2'>
                        <Box display='flex' alignItems='baseline' justifyContent='space-between'>
                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                {type}
                            </Badge>
                        </Box>
                        <Box
                            mt='2'
                            fontWeight='bold'
                            fontSize='xl'
                            as='h4'
                            lineHeight='tight'
                            noOfLines={1}
                        >
                            {name}
                        </Box>
                    </Box>
                </Box>
            </Link>
        </Center>
    )
}

export default OneMarket