import { useState, useEffect} from "react";
import {Stack,Flex,Center,Image,Text} from '@chakra-ui/react';
import useAuth from "../context/auth/useAuth";
import {EditIcon, StarIcon} from '@chakra-ui/icons';
import '../styles/profile.css';
import { API_URL } from "../constants";
import axios from 'axios'
import { NavLink } from "react-router-dom";
const Profile = () => {
	const {currentUser, isLoading, removeUser } = useAuth()
	const [myMarkets, setMyMarkets] = useState([])

	const getRandomMarket = async () => {
		const response = await axios.get(`${API_URL}/markets/discover`)
		 //console.log(response.data)
		setMyMarkets(response.data)
	}
	useEffect(() => {
		getRandomMarket()
	}, [])
	//console.log(currentUser)
	return (
		<>
			<Flex >

			<Image 
				boxSize='20vw'
				ml='40vw'
				borderRadius='full'
				marginTop='5vh'
				src={currentUser.profilePicture} 
				alt={currentUser.name}>
			</Image>
			<NavLink to='/profile/edit'><EditIcon mt='2vh' ml='20vw' w={5} h={5} /></NavLink>
			</Flex>
			<Text fontSize='2xl' ml='40vw' mb='2vh'>{currentUser.name}</Text>
			<hr style={{fontWeight: 'bold'}}/>
			<Text fontSize='3xl' mt='3vh' ml='30vw' mb='5vh'>My Markets</Text>
				
			<Flex >
				<Image src={myMarkets.imageUrl} boxSize='15vw' ml='5vw' mr='10vw'></Image>
				<Flex flexDirection='column' justify='top' mr='10vw'>
				<Text fontSize='1xl'>{myMarkets.name}</Text>
				<Text marginBottom='5vh'>City, Country</Text>
				</Flex>
				<Text>5</Text>
				<StarIcon ml='3vw' mt='.35vh'/>
			</Flex>
				<hr style={{width: '80%', marginLeft:'10%'}}/>
			
			
		</>
	)
}

export default Profile
