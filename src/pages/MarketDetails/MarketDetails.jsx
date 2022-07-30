import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import MarketInfo from "../../components/MarketInfo/MarketInfo"
import { Box, Spinner, Center, Image, Avatar, Text, Stack, Link, Flex, Badge } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
const API_URL = process.env.REACT_APP_API_URL

const MarketDetails = () => {
    const [detailMarket, setDetailMarket] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { marketId } = useParams()

    const getOneMarket = async () => {
        const { data } = await axios.get(`${API_URL}/markets/${marketId}`)
        setDetailMarket(data)
        setIsLoading(false)
        console.log('end of fetch');
    }
    useEffect(() => {
        getOneMarket()
    }, [])

    return (
        <>
       { isLoading && <Center direction='row' position='absolute' mt='30vh' ml='40vw' thickness='4px' spacing={20}> <Spinner size='xl'/></Center> }
         { !isLoading &&  <Stack className="DetailsMarket" py={'4rem'} spacing={4}>
                <Center>
                    <Image
                        boxSize='18rem'
                        w='100%'
                        objectFit='cover'
                        src={detailMarket.imageUrl}
                        alt={detailMarket.name} />
                </Center>
                <Stack spacing={2} px={'2rem'}>
                    <Text fontSize='3xl'>{detailMarket.name}</Text>
                    <Flex alignItems='baseline' justifyContent='space-between'>
                        <Box as='span' color='gray.600' fontSize='sm'>City &bull; Country</Box>
                        <Box display='flex' mt='2' alignItems='center' gap='3px'>
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>10</Box>
                            <StarIcon color={'teal.500'} />
                        </Box>
                    </Flex>
                    <Flex gap='10px' alignItems='center'>
                        <Avatar size='md' mt='3px' src={detailMarket.author?.profilePicture} />
                        <Flex flexDirection='column' gap='2px'>
                            <Text>{detailMarket.author?.name}</Text>
                            <Badge borderRadius='full' px='2' colorScheme='teal' textAlign='center'>Follow</Badge>
                        </Flex>
                    </Flex>
                    <Text fontSize='md'>{detailMarket.description}</Text>
                    <Text fontSize='sm'>Website: <Link href={detailMarket.website} isExternal>{detailMarket.website}</Link></Text>
                </Stack>
            </Stack>}
        </>
    )
};

export default MarketDetails;