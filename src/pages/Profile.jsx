import { useState, useEffect} from "react";
import {Text, Box, Center, Button} from '@chakra-ui/react';
import '../styles/profile.css';
import DisplayMyMarket from "../components/DisplayMyMarket/DisplayMyMarket";
import service from '../services/apiHandler';
const Profile = () => {
	
	const [myMarkets, setMyMarkets] = useState([]);
	const getMyMarkets = async () => {
		const response = await service.myMarkets();
		setMyMarkets(response)
	}
	useEffect(() => {
		getMyMarkets();
	}, []);

	return (
		<Box>
			<Text>PlaceHolder</Text>
			<Center><Text mt='8vh' fontSize='3xl'>My Markets</Text></Center>
		{myMarkets?.map((market) =>{
			return(
			<DisplayMyMarket 
				{...market}
				key={market._id}
			/>
			)
		})}
		<Center>
		<Button mt='5vh'>Create a new market</Button>
		</Center>
		</Box>
	)
}

export default Profile
