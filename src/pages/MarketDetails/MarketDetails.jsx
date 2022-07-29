import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import MarketInfo from "../../components/MarketInfo/MarketInfo"
import { Box, Center, Image, Avatar, Text, Stack, Link, Flex, Badge } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
const API_URL = process.env.REACT_APP_API_URL

const MarketDetails = () => {
    const [detailMarket, setDetailMarket] = useState({})
    const [authorInfo, setAuthorInfo] = useState({})
    const { marketId } = useParams()
    //const navigate = useNavigate()

    const getOneMarket = async () => {

        const{ data }= await axios.get(`${API_URL}/markets/${marketId}`)
        //console.log(data);
        setDetailMarket(data)
        setAuthorInfo(data.author)
    }
    useEffect(() => {
        getOneMarket()
    }, [])

    return (
        <>
            <Stack className="DetailsMarket" py={'4rem'} spacing={4}>
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
                        <Avatar size='md' mt='3px' src={authorInfo.profilePicture} />
                        <Flex flexDirection='column' gap='2px'>
                            <Text>{authorInfo.name}</Text>
                            <Badge borderRadius='full' px='2' colorScheme='teal' textAlign='center'>Follow</Badge>
                        </Flex>
                    </Flex>
                    <Text fontSize='md'>{detailMarket.description}</Text>
                    <Text fontSize='sm'>Website: <Link href={detailMarket.website} isExternal>{detailMarket.website}</Link></Text>
                </Stack>
            </Stack>
        </>
    )
};

export default MarketDetails;