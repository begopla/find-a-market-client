import React from "react"
import { Link } from "react-router-dom"
import { Center, Box, Image, Badge } from '@chakra-ui/react';

function OneMarket({ name, _id, type, imageUrl }) {
    //const imageUrl = 'https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png';

    return (
        <Center>
            <Link to={`/markets/${_id}`}>
            <Box maxW='sm' overflow='hidden' p='5'>
                <Image src={imageUrl} alt={name} borderRadius='xl' />
                <Box p='6'>
                    <Box display='flex' alignItems='baseline'>
                        <Badge borderRadius='full' px='2' colorScheme='teal'>
                            {type}
                        </Badge>
                        <Box
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            fontSize='xs'
                            textTransform='uppercase'
                            ml='2'
                        >
                            Stars
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
                            City &bull; Country
                        </Box>
                    </Box>
                </Box>
            </Box>
           </Link> 
        </Center>
    )
}

export default OneMarket