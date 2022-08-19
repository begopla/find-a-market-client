import React from "react"
import { Link } from "react-router-dom"
import { Center, Box, Image, Badge, Text } from '@chakra-ui/react';


function OneMarketSmall({ name, _id, type, imageUrl, address }) {

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
                       
                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                {type}
                            </Badge>   
                            <Text
                            mt='0.5vh'
                            fontWeight='bold'
                            fontSize='xl'
                            as='h4'
                            lineHeight='tight'
                            noOfLines={1}
                        >
                            {name} 
                        </Text>
                    </Box>
                </Box>
            </Link>
        </Center>
    )
}

export default OneMarketSmall