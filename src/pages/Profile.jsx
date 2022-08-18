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
		<Box height='95vh'>
			<Center><Text mt='8vh' fontSize='3xl'>My Markets</Text></Center>
		
		{myMarkets?.map((market) =>{
			return(
			<DisplayMyMarket  
				{...market}
				id={market._id}
			/>
			)
		})}
		
		</Box>
	)
}

export default Profile
