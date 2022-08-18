import { useState, useEffect} from "react";
import {Text, Box, Center, SimpleGrid, Grid, useColorModeValue, Avatar, Flex} from '@chakra-ui/react';
import '../styles/profile.css';
import DisplayMyMarket from "../components/DisplayMyMarket/DisplayMyMarket";
import service from '../services/apiHandler';
import OneMarketSmall from "../components/OneMarket/OneMarketSmall"
const Profile = () => {
	const [followedUsers, setFollowedUsers] = useState([])
	const [myMarkets, setMyMarkets] = useState([]);
	const getMyMarkets = async () => {
		const response = await service.myMarkets();
		const res = await service.get('/profile/followed')
		console.log(res.data.savedList)
		setMyMarkets(response)
		setFollowedUsers(res.data.savedList)

	}
	
	useEffect(() => {
		getMyMarkets();
	}, []);
	

	return (
		<>
		<Box height='90vh'>
			
			<Center><Text mt='8vh' fontSize='3xl'>My Markets</Text></Center>
		{<SimpleGrid
		bg={useColorModeValue('white', 'gray.700')}
					minChildWidth='10rem'
					spacing='5px'
					className="listMarkets"
					pb={'4rem'}
					px={'3rem'}
					pt={'3rem'}>
		
		
		{myMarkets?.map((market) =>{
			return(
				<OneMarketSmall
								{...market}
								key={market._id}
								id={market._id}
								name={market.name}
							/>
			)
		})}

		</SimpleGrid>}
		
		</Box>

		<Box height='20vh'>
			<Center ><Text  fontSize='3xl'>Users following</Text></Center>
			<Grid
			bg={useColorModeValue('white', 'gray.700')}
					minChildWidth='5vw'
					templateColumns={'repeat(5,1fr)'}
					auto-fit
					spacing='5px'
					className="users"
					pb={'2rem'}
					px={'2rem'}
					pt={'1rem'}
					
			>
				{followedUsers?.map((user)=>{
					return(
						<Box width='20vw' marginLeft='10vw'>

						<Flex direction='column'>

						<Avatar
							size='lg'
							mt="0px"
							src={user.profilePicture}
							/>
						<Text paddingLeft='2vw'>{user.name}</Text>
						</Flex>
						</Box>
						
					)
				})}
			</Grid>
		</Box>
		</>
	)
}

export default Profile
