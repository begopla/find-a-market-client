import { useState, useEffect} from "react";
import {Flex,Image,Text, Box, Center} from '@chakra-ui/react';
import {StarIcon} from '@chakra-ui/icons';
import '../styles/profile.css';
import { API_URL } from "../constants";
import DisplayMyMarket from "../components/DisplayMyMarket/DisplayMyMarket";
import axios from 'axios'
import service from '../services/apiHandler';
const Profile = () => {
	
	const [myMarkets, setMyMarkets] = useState([]);
		
	const getMyMarkets = async () => {
		const response = await service.myMarkets();
		
		//const markets = [...response]

		console.log(response)
		 setMyMarkets(response)
		// console.log(myMarkets)
	}
	useEffect(() => {
		getMyMarkets()
	}, [])

	
	return (
		<Box>
		{myMarkets.length === 0  && <div>Hello Markets</div>}
		{ myMarkets.length>0 && 
		<>

		
			<Text>PlaceHolder</Text>
			<Center><Text mt='8vh' fontSize='3xl'>My Markets</Text></Center>
		{myMarkets?.map((myMarket) =>{
			return(

			<Flex mt='3vh'>
				<Image src={myMarket.imageUrl} boxSize='15vw' ml='5vw' mr='10vw'></Image>
				<Flex flexDirection='column' justify='top' mr='10vw'>
				<Text fontSize='1xl'>{myMarket.name}</Text>
				<Text marginBottom='5vh'>City, Country</Text>
				</Flex>
				<Text>5</Text>
				<StarIcon ml='3vw' mt='.35vh'/>
			</Flex>
			)
})}
				<hr style={{width: '80%', marginLeft:'10%'}}/>
				</>	

		}
		</Box>
	)
}

export default Profile
