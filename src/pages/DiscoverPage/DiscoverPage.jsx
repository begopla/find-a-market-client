import React, { useEffect, useState } from "react"
import axios from "axios"
import { Box, Center, Image, Avatar, Text, Stack, Link, Flex, Badge } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
const API_URL = process.env.REACT_APP_API_URL

const DiscoverPage = () => {
    const [discoverMarket, setDiscoverMarket] = useState({})
    const [authorInfo, setAuthorInfo] = useState({})

    const getRandomMarket = async () => {
        const { data } = await axios.get(`${API_URL}/markets/discover`)
        //console.log(data);
        setDiscoverMarket(data)
        setAuthorInfo(data.author)
    }
    useEffect(() => {
        getRandomMarket()
    }, [])

    return (
        <>
            <Stack className="DetailsMarket" py={'4rem'} spacing={4}>
                <Center>
                    <Image
                        boxSize='18rem'
                        w='100%'
                        objectFit='cover'
                        src={discoverMarket.imageUrl}
                        alt={discoverMarket.name} />
                </Center>
                <Stack spacing={2} px={'2rem'}>
                    <Text fontSize='3xl'>{discoverMarket.name}</Text>
                    <Flex alignItems='baseline' justifyContent='space-between'>
                        <Box as='span' color='gray.600' fontSize='sm'>City &bull; Country</Box>
                        <Box display='flex' mt='2' alignItems='center' gap='3px'>
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>10</Box>
                            <StarIcon color={'teal.500'} />
                        </Box>
                    </Flex>
                    <Flex gap='10px' alignItems='center'>
                        <Avatar size='md' mt='3px' src={authorInfo.profilePicture} />
                        <Flex flexDirection='column' gap='2px'>
                            <Text>{authorInfo.name}</Text>
                            <Badge borderRadius='full' px='2' colorScheme='teal' textAlign='center'>Follow</Badge>
                        </Flex>
                    </Flex>
                    <Text fontSize='md'>{discoverMarket.description}</Text>
                    <Text fontSize='sm'>Website: <Link href={discoverMarket.website} isExternal>{discoverMarket.website}</Link></Text>
                </Stack>
            </Stack>
        </>
    )
};

export default DiscoverPage;