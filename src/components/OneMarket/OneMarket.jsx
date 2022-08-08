import React from "react"
import { Link } from "react-router-dom"
import { Center, Box, Image, Badge, Skeleton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

function OneMarket({ name, _id, type, imageUrl }) {

    return (
        <Center>
            <Link to={`/markets/${_id}`}>
                <Box maxW='15rem' overflow='hidden' pt='3'>
                    <Image
                        boxSize='15rem'
                        objectFit='cover'
                        src={imageUrl}
                        alt={name}
                        borderRadius='xl' />
                    <Box p='2'>
                        <Box display='flex' alignItems='baseline' justifyContent='space-between'>
                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                {type}
                            </Badge>
                            <Box display='flex' mt='2' alignItems='center' gap='3px'>
                                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                    10 
                                </Box>
                                <StarIcon color={'teal.500'} />
                            </Box>
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

                        <Box display='flex' mt='2' alignItems='center'>

                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                City &bull; 
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Link>
        </Center>
    )
}

export default OneMarket