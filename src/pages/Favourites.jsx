import useAuth from "../context/auth/useAuth";
import React, { useState, useEffect } from "react"
import { Text, Center, Box, useColorModeValue, Spinner, SimpleGrid} from '@chakra-ui/react';
import service from "../services/apiHandler";
import OneMarket from "../components/OneMarket/OneMarket";
const Favourites = () => {
	const { currentUser } = useAuth();
    const [favMarkets, setFavMarkets] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const getFavMarkets = async () => {
	  if(currentUser){

		const response = await service.get("/profile/favourites");
		console.log(response);
		setFavMarkets(response.data.savedList)
		setIsLoading(false)
	}
    }
    useEffect(() => {
      getFavMarkets()
    }, [])

    return (
    <>
   
    <Text fontSize='2xl' mt='0vh' ml='40vw' mb='2vh'>Placeholder</Text>
    <Center>
    {currentUser  && <Text fontSize='2xl' mt='5vh' >Discover you're favourite markets</Text>}
	{!currentUser && <Box height='80vh'> <Text fontSize='2xl' mt='5vh'>Log in and start saving your favorite markets </Text> </Box>}
	</Center>

    <Box bg={useColorModeValue('gray.200', 'gray.700')}>
    {isLoading  && currentUser &&<Spinner
				position='fixed'
				top={{ base: '30%', md: '40%', lg: '45%' }}
				left='50%'
				marginLeft='-1.5em'
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='teal.500'
				size='xl' />}
{
				<SimpleGrid
					bg={useColorModeValue('white', 'gray.700')}
					minChildWidth='15rem'
					spacing='5px'
					className="listMarkets"
					marginBottom={'2rem'}
					px={'3rem'}>
					{favMarkets.map((market) => {
						return (
							<OneMarket
								{...market}
								key={market._id}
								id={market._id}
								name={market.name}
							/>
						)
					})}
				</SimpleGrid>
			}
		</Box>

    </>
    ) 
}
export default Favourites